class ProductResult {
  final String supplier;
  final double price;
  final String currency;
  final String stock;
  final String link;

  ProductResult({
    required this.supplier,
    required this.price,
    required this.currency,
    required this.stock,
    required this.link,
  });

  factory ProductResult.fromJson(Map<String, dynamic> json) {
    return ProductResult(
      supplier: json['supplier'] ?? 'Unknown',
      price: (json['price'] as num).toDouble(),
      currency: json['currency'] ?? 'USD',
      stock: json['stock'] ?? 'Unknown',
      link: json['link'] ?? '',
    );
  }
}

class SearchResponse {
  final String product;
  final List<ProductResult> results;

  SearchResponse({required this.product, required this.results});

  factory SearchResponse.fromJson(Map<String, dynamic> json) {
    return SearchResponse(
      product: json['product'] ?? '',
      results: (json['results'] as List)
          .map((i) => ProductResult.fromJson(i))
          .toList(),
    );
  }
}
