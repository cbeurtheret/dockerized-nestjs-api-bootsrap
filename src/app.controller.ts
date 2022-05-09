import { TeapotException } from '@commons/exceptions';
import { Get, Controller } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('teapot/iron')
  @ApiResponse({
    status: 418,
    description: 'Returns always a IAmATeapotException.',
  })
  ironTeapot(): void {
    throw TeapotException.builder()
      .setDescription("I'm an iron teapot")
      .setContext({
        teapot: 'Iron',
      })
      .build();
  }

  @Get('teapot/terracotta')
  @ApiResponse({
    status: 418,
    description: 'Returns always a IAmATeapotException.',
  })
  terracottaTeapot(): void {
    throw TeapotException.builder()
      .setDescription("I'm a terracotta teapot")
      .setContext({
        teapot: 'Terracotta',
      })
      .build();
  }
}
