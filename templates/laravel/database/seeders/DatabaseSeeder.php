<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            \App\Modules\Users\Database\Seeders\UserSeeder::class,
            \App\Modules\Users\Database\Seeders\UsersGroupSeeder::class,
            \App\Modules\Rooms\Database\Seeders\RoomSeeder::class,
			\App\Modules\Positions\Database\Seeders\PositionSeeder::class,
			\App\Modules\Departments\Database\Seeders\DepartmentSeeder::class,
			\App\Modules\Symptoms\Database\Seeders\SymptomSeeder::class,
			\App\Modules\Uploads\Database\Seeders\UploadSeeder::class,
			\App\Modules\Nationalities\Database\Seeders\NationalitySeeder::class,
			\App\Modules\Cities\Database\Seeders\CitySeeder::class,
			\App\Modules\SessionTypes\Database\Seeders\SessionTypeSeeder::class,
			\App\Modules\Sessions\Database\Seeders\SessionSeeder::class,
			\App\Modules\Specialities\Database\Seeders\SpecialitySeeder::class,
			\App\Modules\Invoices\Database\Seeders\InvoiceSeeder::class,
			\App\Modules\Notifications\Database\Seeders\NotificationSeeder::class,
			\App\Modules\ExpensesTypes\Database\Seeders\ExpensesTypeSeeder::class,
			\App\Modules\Expenses\Database\Seeders\ExpenseSeeder::class,
			\App\Modules\Homes\Database\Seeders\HomeSeeder::class,
			\App\Modules\RoomsTypes\Database\Seeders\RoomsTypeSeeder::class,
			\App\Modules\Items\Database\Seeders\ItemSeeder::class,
			\App\Modules\Items\Database\Seeders\ItemCategorySeeder::class,
			\App\Modules\Purchases\Database\Seeders\PurchaseSeeder::class,
			\App\Modules\Suppliers\Database\Seeders\SupplierSeeder::class,
			\App\Modules\MedicalProfiles\Database\Seeders\MedicalProfileSeeder::class,
			\App\Modules\MedicalReports\Database\Seeders\MedicalReportSeeder::class,
			// DatabaseSeeds: DO NOT Remove This Line.
        ]);
    }
}
