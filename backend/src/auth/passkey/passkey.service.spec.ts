import { ConfigService } from '@nestjs/config';
import { PasskeyService } from './passkey.service';

describe('PasskeyService', () => {
  it('builds registration options for an authenticated user', async () => {
    const userRepository = {
      findOne: jest.fn().mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        fullName: 'Test User',
      }),
    };

    const service = new PasskeyService(
      userRepository as any,
      new ConfigService(),
      {} as any,
      {} as any,
    );

    const result = await service.createRegistrationOptions('user-1');

    expect(result).toHaveProperty('challenge');
    expect(result).toHaveProperty('rp');
    expect(result.user).toMatchObject({
      id: 'dXNlci0x',
      name: 'test@example.com',
      displayName: 'Test User',
    });
  });
});
