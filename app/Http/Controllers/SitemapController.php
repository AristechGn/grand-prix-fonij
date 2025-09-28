<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;

class SitemapController extends Controller
{
    /**
     * Generate and return the sitemap XML
     */
    public function index(): Response
    {
        $sitemap = Sitemap::create();
        
        // Add static pages
        $staticPages = [
            '/' => ['priority' => 1.0, 'changefreq' => 'daily'],
            '/a-propos' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/candidater' => ['priority' => 0.9, 'changefreq' => 'weekly'],
            '/programme' => ['priority' => 0.8, 'changefreq' => 'weekly'],
            '/categories-de-prix' => ['priority' => 0.8, 'changefreq' => 'weekly'],
            '/actualites' => ['priority' => 0.7, 'changefreq' => 'daily'],
            '/accompagnement' => ['priority' => 0.7, 'changefreq' => 'monthly'],
            '/contact' => ['priority' => 0.6, 'changefreq' => 'monthly'],
        ];
        
        foreach ($staticPages as $path => $config) {
            $sitemap->add(
                Url::create($path)
                    ->setLastModificationDate(Carbon::now())
                    ->setChangeFrequency($config['changefreq'])
                    ->setPriority($config['priority'])
            );
        }
        
        // Add dynamic pages if needed (e.g., individual news articles, applications, etc.)
        // You can extend this based on your models
        
        return response($sitemap->render(), 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }
}
