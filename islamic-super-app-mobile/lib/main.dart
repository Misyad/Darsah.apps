import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:islamic_super_app_mobile/core/services/location_service.dart';
import 'package:islamic_super_app_mobile/core/services/api_service.dart';
import 'package:islamic_super_app_mobile/core/services/prayer_time_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Islamic Super App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final LocationService _locationService = LocationService();
  final PrayerTimeService _prayerService = PrayerTimeService();
  final ApiService _apiService = ApiService();

  String _locationMessage = "Mencari lokasi...";
  String _fajrTime = "-";
  String _maghribTime = "-";
  int _duasCount = 0;

  @override
  void initState() {
    super.initState();
    _initData();
  }

  Future<void> _initData() async {
    // Ambil Kordinat
    Position? pos = await _locationService.getCurrentPosition();
    if (pos != null) {
      setState(() {
        _locationMessage = "Lokasi: ${pos.latitude.toStringAsFixed(2)}, ${pos.longitude.toStringAsFixed(2)}";
      });

      // Hitung Jadwal Sholat
      final prayerTimes = _prayerService.getPrayerTimes(pos.latitude, pos.longitude);
      if (prayerTimes != null) {
        setState(() {
          _fajrTime = _prayerService.formatTime(prayerTimes.fajr);
          _maghribTime = _prayerService.formatTime(prayerTimes.maghrib);
        });
      }
    } else {
      setState(() {
        _locationMessage = "Izin lokasi ditolak / tidak tersedia.";
      });
    }

    // Ambil Data Doa dari Server Lokal Backend
    try {
      final duas = await _apiService.fetchDailyDuas();
      setState(() {
        _duasCount = duas.length;
      });
    } catch (e) {
      print("Gagal mengambil data doa: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Beranda Islamic App'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Status Geolocation:', style: Theme.of(context).textTheme.titleMedium),
            Text(_locationMessage, style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 20),
            Text('Jadwal Sholat (Astronomi):', style: Theme.of(context).textTheme.titleMedium),
            Text('Subuh: $_fajrTime'),
            Text('Maghrib: $_maghribTime'),
            const SizedBox(height: 20),
            Text('Data Backend Lokal:', style: Theme.of(context).textTheme.titleMedium),
            Text('Berhasil memuat $_duasCount doa dari server Node.js'),
          ],
        ),
      ),
    );
  }
}
