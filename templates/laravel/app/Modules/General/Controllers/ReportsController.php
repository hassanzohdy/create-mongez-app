<?php

namespace App\Modules\General\Controllers;

use HZ\Illuminate\Mongez\Http\ApiController;
use App\Modules\General\Services\Reports;
use Illuminate\Http\Request;

class ReportsController extends ApiController
{
    /**
     * Repository name
     * 
     * @var string
     */
    public const REPORT_HANDLER = '';

    /**
     * Get expenses overview
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $report = $this->makeReport();

        $now = now();

        return $this->success([
            'overview' => [
                'total' => $report->sum(),
                'thisMonth' => $report->sum([
                    'startDate' => $now->startOfMonth(),
                    'endDate' => $now->endOfMonth(),
                ]),
                'thisYear' => $report->sum([
                    'startDate' => $now->startOfYear(),
                    'endDate' => $now->endOfYear(),
                ]),
                'thisWeek' => $report->sum([
                    'startDate' => $now->startOfWeek(),
                    'endDate' => $now->endOfWeek(),
                ]),
            ],
            'thisWeek' => $report->perWeek($now),
            'thisMonth' => $report->perYear([
                'year' => $now->year,
            ]),
            'thisYear' => $report->perYears(),
        ]);
    }

    /**
     * Get expenses reports per year
     * 
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function perYear(Request $request)
    {
        $report = $this->makeReport();
        return $this->success([
            'report' => $report->perYear($request->all()),
        ]);
    }

    /**
     * Get report handler
     * 
     * @return Reports
     */
    protected function makeReport(): Reports
    {
        return app()->make(static::REPORT_HANDLER);
    }
}
