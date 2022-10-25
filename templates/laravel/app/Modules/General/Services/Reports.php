<?php

namespace App\Modules\General\Services;

use Illuminate\Support\Facades\Date;
use Carbon\CarbonInterface;
use HZ\Illuminate\Mongez\Repository\Concerns\RepositoryTrait;
use HZ\Illuminate\Mongez\Repository\MongoDBRepositoryManager;
use HZ\Illuminate\Mongez\Database\Eloquent\MongoDB\Aggregate\Aggregate;

class Reports
{
    use RepositoryTrait;

    /**
     * Main Repository
     * 
     * @var MongoDBRepositoryManager
     */
    protected ?MongoDBRepositoryManager $repository;

    /**
     * Constructor

     * @param MongoDBRepositoryManager $repository
     */
    public function __construct(MongoDBRepositoryManager $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Sum total amount by the given options list
     * 
     * @param array $options
     * @return float
     */
    public function sum(array $options = []): float
    {
        $query = $this->repository->aggregate();

        $this->makeFilter($query, $options);

        $queryUtils = $query->utils();

        $query->groupBy()->data($queryUtils->toArray(
            $queryUtils->sum('amount')
        ));

        return collect($query->get())->first()->amount ?? 0;
    }

    /**
     * Get total amount between the given dates grouped by day
     *
     * @param CarbonInterface $startDate
     * @param CarbonInterface $endDate
     * @param array $moreFilters
     * @return array
     */
    public function between(CarbonInterface $startDate, CarbonInterface $endDate, array $moreFilters = []): array
    {
        $query = $this->repository->aggregate();

        $this->makeFilter($query, $moreFilters);

        $utils = $query->utils();

        $query->whereBetween('date', $startDate, $endDate);

        $query->groupByDate('date')->data(
            $utils->map(
                $utils->sum('amount'),
            )
        );

        $results = $query->get();

        return collect($results)->map(function ($total) {
            $date = Date::createFromDate($total['_id']['year'], $total['_id']['month'], $total['_id']['day']);

            return [
                'amount' => $total['amount'],
                'date' => [
                    'format' => $date->format('d-m-Y'),
                    'timestamp' => $date->timestamp,
                    'weekDay' => $date->dayOfWeek,
                ],
            ];
        })->sortBy('date.timestamp')->toArray();
    }


    /**
     * Get total sales for the given week grouped by day
     *
     * @param CarbonInterface $startDate
     * @return array
     */
    public function perWeek(CarbonInterface $startDate): array
    {
        $startOfWeek = $startDate->startOfWeek();
        $endOfWeek = $startOfWeek->endOfWeek();

        $days = collect($this->between($startOfWeek, $endOfWeek));

        $day = $startOfWeek;

        $returnedDays = [];

        // Now let's check if the $days has all the days of the week
        // so we will loop over the week days
        // if the week day is not in the returned days query
        // then add it as empty day with zero amount

        while ($day->lte($endOfWeek)) {
            $salesDay = $days->where('date.weekDay', $day->dayOfWeek)->first();

            if ($salesDay) {
                $returnedDays[] = $salesDay;
            } else {
                $returnedDays[] = [
                    'amount' => 0,
                    'date' => [
                        'format' => $day->format('d-m-Y'),
                        'timestamp' => $day->timestamp,
                        'weekDay' => $day->dayOfWeek,
                    ],
                ];
            }

            $day = $day->addDay();
        }

        return [
            'startDate' => $startOfWeek->format('d-m-Y'),
            'endDate' => $endOfWeek->format('d-m-Y'),
            'days' => $returnedDays,
        ];
    }

    /**
     * Apply filters for the given query
     * 
     * @param  Aggregate $query
     * @param  array $options
     * @return void
     */
    protected function makeFilter(Aggregate $query, array $options): void
    {
        if (!empty($options['date'])) {
            $date = Date::parse($options['date']);

            $query->whereBetween('date', $date->startOfDay(), $date->endOfDay());
        }

        if (!empty($options['between'])) {
            $between = $options['between'];
            $query->whereBetween('date', $between[0], $between[1]);
        }

        if (!empty($options['type'])) {
            $query->where('type.id', (int) $options['type']);
        }

        if (!empty($options['paidBy'])) {
            $query->where('paidBy.id', (int) $options['paidBy']);
        }

        if (!empty($options['createdBy'])) {
            $query->where('createdBy.id', (int) $options['createdBy']);
        }

        if (!empty($options['status'])) {
            $query->where('status', $options['status']);
        }
    }

    /**
     * Get total amount reports per year divided by month
     * 
     * @param  array $options
     * @return array
     */
    public function perYear(array $options = []): array
    {
        $query = $this->repository->aggregate();

        $year = $options['year'] ?? date('Y');

        $startOfYear = Date::create($year)->startOfYear();

        $endOfYear = Date::create($year)->endOfYear();

        $options['between'] = [
            $startOfYear,
            $endOfYear,
        ];

        $this->makeFilter($query, $options);

        $utils = $query->utils();

        $query->groupByMonth('date')->data($utils->toArray(
            $utils->sum('amount')
        ));

        return collect(array_map(function ($item) {
            return [
                'month' => $item['_id']['month'],
                'amount' => $item['amount'],
            ];
        }, $query->get()))->sortBy('month')->values()->toArray();
    }

    /**
     * Get total amounts over the years
     * 
     * @param  array $options
     * @return array
     */
    public function perYears(array $options = []): array
    {
        $query = $this->repository->aggregate();

        $this->makeFilter($query, $options);

        $utils = $query->utils();
        $query->groupByYear('date')->data($utils->toArray(
            $utils->sum('amount')
        ));

        return collect(array_map(function ($item) {
            return [
                'year' => $item['_id']['year'],
                'amount' => $item['amount'],
            ];
        }, $query->get()))->sortBy('year')->values()->toArray();
    }
}
