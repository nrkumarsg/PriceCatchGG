import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';
import '../providers/search_provider.dart';

class ResultsScreen extends ConsumerWidget {
  const ResultsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final searchState = ref.watch(searchResultsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Search Results')),
      body: searchState.when(
        data: (data) {
          if (data == null) return const Center(child: Text('No results yet.'));
          if (data.results.isEmpty) return const Center(child: Text('No matching products found.'));

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  'Results for: ${data.product}',
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF6366F1)),
                ),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: data.results.length,
                  itemBuilder: (context, index) {
                    final item = data.results[index];
                    return Card(
                      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: ListTile(
                        title: Text(item.supplier, style: const TextStyle(fontWeight: FontWeight.bold)),
                        subtitle: Text(item.stock, style: TextStyle(color: item.stock.toLowerCase().contains('in stock') ? Colors.green : Colors.orange)),
                        trailing: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('${item.currency} ${item.price.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                            const Icon(Icons.open_in_new, size: 16),
                          ],
                        ),
                        onTap: () => launchUrl(Uri.parse(item.link)),
                      ),
                    );
                  },
                ),
              ),
            ],
          );
        },
        loading: () => const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 20),
              Text('Analyzing product data...'),
            ],
          ),
        ),
        error: (e, _) => Center(child: Text('Error: $e')),
      ),
    );
  }
}
