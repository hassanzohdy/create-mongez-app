<?php

namespace App\Modules\Home\Controllers\Admin;

use App\Modules\Sessions\Repositories\SessionsRepository;
use HZ\Illuminate\Mongez\Http\ApiController;
use Illuminate\Http\Request;

class HomeController extends ApiController
{
    /**
     * {@inheritDoc}
     */
    public function index(Request $request)
    {
        $today = today();

        $onlineNow = [
            'rooms' => [],
            'therapists' => [],
            'patients' => [],
            'relatives' => [],
        ];

        $sessionsToday = $this->sessionsRepository->listModels([
            'date' => $today,
        ])->map(function ($session) use (&$onlineNow) {
            if ($session->status === SessionsRepository::IN_PROGRESS_STATUS) {
                $session->online = true;
                $onlineNow['patients'][] = $session->patient['id'];

                if (!empty($session['relative'])) {
                    $onlineNow['relatives'][] = $session->relative['id'];
                }

                $onlineNow['therapists'][] = $session->therapist['id'];
                $onlineNow['rooms'][] = $session->room['id'];
            }

            return $session;
        });

        return $this->success([
            'totals' => [
                'today' => [
                    'newPatients' => $this->usersRepository->total([
                        'accountType' => 'patient',
                        'createdAt' => $today,
                    ]),
                    'newRelatives' => $this->usersRepository->total([
                        'accountType' => 'relative',
                        'createdAt' => $today,
                    ]),
                    'sessions' => $this->sessionsRepository->total([
                        'date' => $today,
                    ]),
                    'sessionsNow' => $this->sessionsRepository->total([
                        'status' => SessionsRepository::IN_PROGRESS_STATUS,
                        'date' => $today,
                    ]),
                    // 'expenses' => $this->expensesRepository->reports()->sum([
                    //     'date' => $today,
                    // ]),
                ]
            ],
            'today' => [
                'sessions' => $this->sessionsRepository->wrapMany($sessionsToday),
                'patients' => $this->usersRepository->wrapMany($sessionsToday->unique('patient.id')->pluck('patient')->map(function ($patient) use ($onlineNow) {
                    $patient['online'] = in_array($patient['id'], $onlineNow['patients']);
                    return $patient;
                })),
                'relatives' => $this->usersRepository->wrapMany($sessionsToday->unique('relative.id')->whereNotNull('relative')->pluck('relative')->map(function ($relative) use ($onlineNow) {
                    $relative['online'] = in_array($relative['id'], $onlineNow['relatives']);
                    return $relative;
                })),
                'therapists' => $this->usersRepository->wrapMany($sessionsToday->unique('therapist.id')->pluck('therapist')->map(function ($therapist) use ($onlineNow) {
                    $therapist['online'] = in_array($therapist['id'], $onlineNow['therapists']);
                    return $therapist;
                })),
                'rooms' => $this->roomsRepository->wrapMany($sessionsToday->unique('room.id')->pluck('room')->map(function ($room) use ($onlineNow) {
                    $room['online'] = in_array($room['id'], $onlineNow['rooms']);
                    return $room;
                })),
            ]
        ]);
    }
}
