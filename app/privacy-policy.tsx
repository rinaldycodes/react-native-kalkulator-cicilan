import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const PrivacyPolicyScreen: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Kebijakan Privasi</Text>
            <Text style={styles.text}>
                Kebijakan Privasi ini menjelaskan bahwa aplikasi Kalkulator Cicilan tidak mengumpulkan, menyimpan, atau membagikan informasi pribadi Anda.
            </Text>
            <Text style={styles.sectionTitle}>Informasi yang Kami Kumpulkan</Text>
            <Text style={styles.text}>
                Aplikasi ini tidak mengumpulkan informasi pribadi apapun. Semua perhitungan dilakukan secara lokal di perangkat Anda tanpa mengirimkan data ke server.
            </Text>
            <Text style={styles.sectionTitle}>Penggunaan Informasi</Text>
            <Text style={styles.text}>
                Karena kami tidak mengumpulkan data, tidak ada penggunaan informasi pribadi. Aplikasi ini hanya berfungsi untuk membantu Anda dalam melakukan perhitungan cicilan pinjaman.
            </Text>
            <Text style={styles.sectionTitle}>Keamanan Informasi</Text>
            <Text style={styles.text}>
                Meskipun aplikasi ini tidak mengumpulkan informasi pribadi, kami tetap berkomitmen untuk menjaga keamanan aplikasi dan mencegah akses tidak sah.
            </Text>
            <Text style={styles.sectionTitle}>Perubahan Kebijakan Privasi</Text>
            <Text style={styles.text}>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Anda akan diberitahu tentang perubahan melalui aplikasi.
            </Text>
            <Text style={styles.sectionTitle}>Kontak Kami</Text>
            <Text style={styles.text}>
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui email di bangrinaldy.tech@gmail.com.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 12,
        color: '#555',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
        color: '#666',
    },
});

export default PrivacyPolicyScreen;
