import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class ChallengeController {
  @Get('.well-known/acme-challenge/:token')
  serveChallenge(@Param('token') token: string, @Res() res: Response) {
    // Retrieve the challenge token value and serve it as the response
    const challengeValue = this.getChallengeValue(token);
    res.send(challengeValue);
  }
  
  private getChallengeValue(token: string): string {
    // Implement your logic to retrieve the challenge token value
    // This value should be stored in your database or generated dynamically
    // based on the challenge token.
    // Return the challenge token value to be served as the response.
    return 'your_challenge_token_value';
  }
}
