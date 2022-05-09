import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'places' })
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'json', nullable: false })
  address: object;
}
