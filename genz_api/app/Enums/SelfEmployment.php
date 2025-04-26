<?php

declare(strict_types=1);

namespace App\Enums;

enum SelfEmployment: string
{
    case EASY = 'Easy';
    case MEDIUM = 'Medium';
    case HARD = 'Hard';

    public function label(): string
    {
        return match($this) {
            self::EASY => 'Easy',
            self::MEDIUM => 'Medium',
            self::HARD => 'Hard',
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