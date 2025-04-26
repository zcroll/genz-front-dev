<?php

declare(strict_types=1);

namespace App\Enums;

enum EmploymentType: string
{
    case FULL_TIME = 'Full-time';
    case MIXED = 'Mixed';
    case PART_TIME = 'Part-time';

    public function label(): string
    {
        return match($this) {
            self::FULL_TIME => 'Full-time',
            self::MIXED => 'Mixed',
            self::PART_TIME => 'Part-time',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_combine(
            array_column(self::cases(), 'value'),
            array_map(fn(self $case) => $case->label(), self::cases())
        );
    }
} 