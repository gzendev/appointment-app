
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Appointment } from './appointment.interface';
import { CreateAppointmentDto } from './create-appointment.dto';

@Controller('appointments')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppointments(): Appointment[] {
    return this.appService.findAll();
  }

  @Post()
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto): Appointment {
    return this.appService.create(createAppointmentDto);
  }

  @Put(':id')
  updateAppointment(
    @Param('id') id: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Appointment {
    return this.appService.update(id, createAppointmentDto);
  }

  @Delete(':id')
  deleteAppointment(@Param('id') id: string): void {
    return this.appService.delete(id);
  }
}
