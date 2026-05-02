import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          const ListTile(
            title: Text('Suppliers', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
          ),
          SwitchListTile(
            title: const Text('RS Components'),
            subtitle: const Text('sg.rs-online.com'),
            value: true,
            onChanged: (val) {},
          ),
          SwitchListTile(
            title: const Text('Element14'),
            subtitle: const Text('sg.element14.com'),
            value: true,
            onChanged: (val) {},
          ),
          const Divider(),
          const ListTile(
            title: Text('App Information'),
          ),
          const ListTile(
            title: Text('Version'),
            trailing: Text('1.0.0'),
          ),
          const ListTile(
            title: Text('PricePilot AI Backend'),
            trailing: Text('Connected', style: TextStyle(color: Colors.green)),
          ),
        ],
      ),
    );
  }
}
