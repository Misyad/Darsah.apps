import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Ganti dengan IP komputer server lokal karena menggunakan Android emulator / device
  // Jika pakai Android emulator lokal, gunakan '10.0.2.2'. Jika device fisik, gunakan IP Wifi lokal.
  static const String baseUrl = 'http://10.0.2.2:3000/api';

  Future<List<dynamic>> fetchQuran() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/quran'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load Quran');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<List<dynamic>> fetchDailyDuas() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/duas'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load Duas');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
