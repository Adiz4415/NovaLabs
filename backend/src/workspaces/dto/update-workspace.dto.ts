import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateWorkspaceDto } from './create-workspace.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Payload for partially updating an existing workspace.
 *
 * All {@link CreateWorkspaceDto} fields are optional, plus an `isActive`
 * flag used to enable or disable the workspace.
 */
export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
