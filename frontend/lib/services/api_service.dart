import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product_result.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';

  Future<SearchResponse> searchProducts({String? query, String? imageBase64}) async {
    final response = await http.post(
      Uri.parse('$baseUrl/search'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        if (query != null) 'query': query,
        if (imageBase64 != null) 'image': imageBase64,
      }),
    );

    if (response.statusCode == 200) {
      return SearchResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load search results: ${response.body}');
    }
  }

  Future<List<Map<String, dynamic>>> getSources() async {
    final response = await http.get(Uri.parse('$baseUrl/sources'));
    if (response.statusCode == 200) {
      return List<Map<String, dynamic>>.from(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load sources');
    }
  }
}
