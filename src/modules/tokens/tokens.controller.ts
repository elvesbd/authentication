import { Body, Controller, Put } from '@nestjs/common';
import { TokenDto } from './dto/create-token.dto';
import { IToken } from './interface/token.interface';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Put('refresh')
  async refreshToken(@Body() tokenDto: TokenDto): Promise<IToken> {
    const refreshedToken = await this.tokensService.refreshToken(
      tokenDto.oldToken,
    );
    return refreshedToken;
  }
}
