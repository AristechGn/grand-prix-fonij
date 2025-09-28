<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap for Grand Prix FONIJ';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating sitemap...');
        
        $sitemapPath = public_path('sitemap.xml');
        
        // Generate sitemap by crawling the site
        SitemapGenerator::create(config('app.url'))
            ->hasCrawled(function (Url $url) {
                // Skip admin routes
                if (str_contains($url->getPath(), '/admin')) {
                    return false;
                }
                
                // Skip API routes
                if (str_contains($url->getPath(), '/api')) {
                    return false;
                }
                
                // Skip authentication routes
                if (str_contains($url->getPath(), '/login') || 
                    str_contains($url->getPath(), '/register') ||
                    str_contains($url->getPath(), '/forgot-password') ||
                    str_contains($url->getPath(), '/reset-password')) {
                    return false;
                }
                
                return true;
            })
            ->setMaximumCrawlCount(100)
            ->writeToFile($sitemapPath);
        
        // Add additional static pages manually
        $sitemap = Sitemap::create();
        
        // Add important static pages
        $staticPages = [
            '/' => ['priority' => 1.0, 'changefreq' => 'daily'],
            '/a-propos' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/candidater' => ['priority' => 0.9, 'changefreq' => 'weekly'],
            '/programme' => ['priority' => 0.8, 'changefreq' => 'weekly'],
            '/categories' => ['priority' => 0.8, 'changefreq' => 'weekly'],
            '/actualites' => ['priority' => 0.7, 'changefreq' => 'daily'],
            '/accompagnement' => ['priority' => 0.7, 'changefreq' => 'monthly'],
        ];
        
        foreach ($staticPages as $path => $config) {
            $sitemap->add(
                Url::create($path)
                    ->setLastModificationDate(Carbon::now())
                    ->setChangeFrequency($config['changefreq'])
                    ->setPriority($config['priority'])
            );
        }
        
        // Write the enhanced sitemap
        $sitemap->writeToFile($sitemapPath);
        
        $this->info('Sitemap generated successfully at: ' . $sitemapPath);
        
        return Command::SUCCESS;
    }
}
