<?php

namespace App\Validators;

class IsOrderListValid
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        $listLength = count($value);

        // Check if order values are not out of bounds
        foreach ($value as $paragraph) {
            if ($paragraph["order"] < 1 || $paragraph["order"] > $listLength) return false;
        }

        // Check if order values are unique
        for ($i = 1; $i <= $listLength; $i++) {
            foreach ($value as $paragraph) {
                if ($paragraph["order"] === $i) continue 2;
            }
            return false;
        }

        return true;
    }
}