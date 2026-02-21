import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService, PrismaService],
})
export class PaymentsModule { }