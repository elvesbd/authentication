import { Body, Controller, Put } from '@nestjs/common';
import { TokenDto } from './dto/create-token.dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Put('refresh')
  async refreshToken(@Body() tokenDto: TokenDto) {
    return this.tokensService.refreshToken(tokenDto.oldToken);
  }
}
