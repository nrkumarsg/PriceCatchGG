import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/product_result.dart';
import '../services/api_service.dart';

final apiServiceProvider = Provider((ref) => ApiService());

final searchResultsProvider = StateNotifierProvider<SearchNotifier, AsyncValue<SearchResponse?>>((ref) {
  return SearchNotifier(ref.watch(apiServiceProvider));
});

class SearchNotifier extends StateNotifier<AsyncValue<SearchResponse?>> {
  final ApiService _apiService;

  SearchNotifier(this._apiService) : super(const AsyncValue.data(null));

  Future<void> search(String query) async {
    state = const AsyncValue.loading();
    try {
      final results = await _apiService.searchProducts(query: query);
      state = AsyncValue.data(results);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> searchByImage(String base64Image) async {
    state = const AsyncValue.loading();
    try {
      final results = await _apiService.searchProducts(imageBase64: base64Image);
      state = AsyncValue.data(results);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  void clear() {
    state = const AsyncValue.data(null);
  }
}
