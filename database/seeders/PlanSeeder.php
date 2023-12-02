<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stripe_plans')->insert([[
            'title' => "Silver",
            'stripe_key' =>'price_1OITJpSFtADfAsVNQMBcjhps',
            'subtitle' =>"Get Your First Job",
            'head1' =>"Let's Start With The Basics",
            'feature1' =>"Basic Coding",
            'feature2' =>"Basic DSA",
            'feature3' =>"1 Frontend Language",
            'feature4' =>'1 Backend Language',
            'feature5' =>"1 Project",
            'originalPrice' =>3000,
            'discountedPrice' => 2000
        ],[
            'title' => "Gold",
            'stripe_key' => 'price_1OITOBSFtADfAsVNSxvL7hF9',
            'subtitle' =>"Let's Get More Advanced",
            'head1' =>"Go Beyond Your Fresher Times",
            'feature1' =>"Advanced DSA",
            'feature2' =>"Dynamic Programming",
            'feature3' =>"1 Backend Framework",
            'feature4' =>'1 Frontend Framework',
            'feature5' =>"5 Projects",
            'originalPrice' =>5000,
            'discountedPrice' =>3500
        ],[
            'title' => "Platinum",
            'stripe_key' => 'price_1OITOoSFtADfAsVNExIQEahx',
            'subtitle' =>"Get Your Dream Job",
            'head1' =>"Time To Dive Into Something Real",
            'feature1' =>"System Design",
            'feature2' =>"Shell Basics",
            'feature3' =>"Backend Security",
            'feature4' =>'Frontend Optimization',
            'feature5' =>"2000 DSA + 8 Projects",
            'originalPrice' =>6000,
            'discountedPrice' =>10000
        ]]);
    }
}
