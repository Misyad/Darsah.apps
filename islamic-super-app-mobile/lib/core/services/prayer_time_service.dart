import 'package:adhan/adhan.dart';
import 'package:intl/intl.dart';

class PrayerTimeService {
  PrayerTimes? getPrayerTimes(double latitude, double longitude) {
    if (latitude == 0.0 || longitude == 0.0) return null;

    final coordinates = Coordinates(latitude, longitude);
    
    // Asumsi pengguna ada di Indonesia, memakai parameter jadwal kemenag secara umum (bisa diadjust ke parameter Muslim World League dll)
    final params = CalculationMethod.muslim_world_league.getParameters();
    params.madhab = Madhab.shafi;
    
    final date = DateComponents.from(DateTime.now());
    final prayerTimes = PrayerTimes(coordinates, date, params);
    
    return prayerTimes;
  }

  String formatTime(DateTime time) {
    return DateFormat('HH:mm').format(time);
  }
}
