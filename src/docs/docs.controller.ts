import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class DocsController {
  @Get('/')
  root(@Res() res: Response) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>API Docs</title>
          <meta charset="utf-8"/>
        </head>
        <body>
          <script id="api-reference" data-hide-schema-section="true" data-url="/api/openapi.yaml"></script>
          <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        </body>
      </html>
    `);
  }

  @Get('/openapi.yaml')
  openapi(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'openapi.yaml'));
  }
}
