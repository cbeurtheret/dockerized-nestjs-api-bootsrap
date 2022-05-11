import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
}
