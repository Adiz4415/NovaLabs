import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceLog } from '../entities/workspace-log.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { OccupancyQueryDto } from '../dto/occupancy-query.dto';

export interface WorkspaceOccupancy {
  workspaceId: string;
  workspaceName: string;
  totalSeats: number;
  currentOccupancy: number;
  utilizationPercent: number;
}

export interface UtilizationStats {
  workspaceId: string;
  workspaceName: string;
  totalVisits: number;
  uniqueUsers: number;
  avgDurationMinutes: number;
  totalHours: number;
}

@Injectable()
export class OccupancyProvider {
  constructor(
    @InjectRepository(WorkspaceLog)
    private readonly logsRepository: Repository<WorkspaceLog>,
    @InjectRepository(Workspace)
    private readonly workspacesRepository: Repository<Workspace>,
  ) {}

  /**
   * Returns live occupancy data for all active workspaces, or a single one.
   * @param workspaceId - Optional UUID to filter to a specific workspace
   * @returns Array of occupancy records with seat totals and utilization percentages
   */
  async getCurrentOccupancy(
    workspaceId?: string,
  ): Promise<WorkspaceOccupancy[]> {
    const workspaceQb = this.workspacesRepository
      .createQueryBuilder('ws')
      .where('ws.isActive = true');
    if (workspaceId) {
      workspaceQb.andWhere('ws.id = :workspaceId', { workspaceId });
    }
    const workspaces = await workspaceQb.getMany();

    const results: WorkspaceOccupancy[] = [];

    for (const ws of workspaces) {
      const currentOccupancy = await this.logsRepository.count({
        where: { workspaceId: ws.id, checkedOutAt: null as any },
      });

      results.push({
        workspaceId: ws.id,
        workspaceName: ws.name,
        totalSeats: ws.totalSeats,
        currentOccupancy,
        utilizationPercent:
          ws.totalSeats > 0
            ? Math.round((currentOccupancy / ws.totalSeats) * 100)
            : 0,
      });
    }

    return results;
  }

  /**
   * Aggregates workspace utilization statistics over a date range.
   * @param query - Filter options including workspaceId, from date, and to date
   * @returns Array of utilization stats per workspace with visit counts, unique users, and average duration
   */
  async getUtilizationStats(
    query: OccupancyQueryDto,
  ): Promise<UtilizationStats[]> {
    const qb = this.logsRepository
      .createQueryBuilder('log')
      .select('log.workspaceId', 'workspaceId')
      .addSelect('COUNT(log.id)', 'totalVisits')
      .addSelect('COUNT(DISTINCT log.userId)', 'uniqueUsers')
      .addSelect('COALESCE(AVG(log.durationMinutes), 0)', 'avgDurationMinutes')
      .addSelect('COALESCE(SUM(log.durationMinutes), 0) / 60.0', 'totalHours')
      .where('log.checkedOutAt IS NOT NULL')
      .groupBy('log.workspaceId');

    if (query.workspaceId) {
      qb.andWhere('log.workspaceId = :workspaceId', {
        workspaceId: query.workspaceId,
      });
    }
    if (query.from) {
      qb.andWhere('log.checkedInAt >= :from', { from: query.from });
    }
    if (query.to) {
      qb.andWhere('log.checkedInAt < :to', {
        to: new Date(new Date(query.to).getTime() + 86400000).toISOString(),
      });
    }

    const rows = await qb.getRawMany<{
      workspaceId: string;
      totalVisits: string;
      uniqueUsers: string;
      avgDurationMinutes: string;
      totalHours: string;
    }>();

    // Enrich with workspace names
    const workspaceIds = rows.map((r) => r.workspaceId);
    const workspaces =
      workspaceIds.length > 0
        ? await this.workspacesRepository
            .createQueryBuilder('ws')
            .whereInIds(workspaceIds)
            .getMany()
        : [];

    const nameMap = new Map(workspaces.map((ws) => [ws.id, ws.name]));

    return rows.map((r) => ({
      workspaceId: r.workspaceId,
      workspaceName: nameMap.get(r.workspaceId) ?? 'Unknown',
      totalVisits: Number(r.totalVisits),
      uniqueUsers: Number(r.uniqueUsers),
      avgDurationMinutes: Math.round(Number(r.avgDurationMinutes)),
      totalHours: Math.round(Number(r.totalHours) * 10) / 10,
    }));
  }

  /**
   * Fetches the most recent workspace check-in logs ordered by check-in time descending.
   * @param workspaceId - Optional UUID to filter logs to a specific workspace
   * @param limit - Maximum number of log entries to return (default 50)
   * @returns Array of WorkspaceLog entries
   */
  async getRecentLogs(
    workspaceId?: string,
    limit = 50,
  ): Promise<WorkspaceLog[]> {
    const qb = this.logsRepository
      .createQueryBuilder('log')
      .orderBy('log.checkedInAt', 'DESC')
      .take(limit);

    if (workspaceId) {
      qb.where('log.workspaceId = :workspaceId', { workspaceId });
    }

    return qb.getMany();
  }
}
