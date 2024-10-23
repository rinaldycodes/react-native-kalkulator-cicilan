import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';

const App: React.FC = () => {
    const handleFeedback = () => {
        Alert.alert(
            "Umpan Balik",
            "Apakah kamu memiliki saran atau permintaan fitur untuk aplikasi ini?",
            [
                { text: "Batal", style: "cancel" },
                { text: "Kirim", onPress:  () =>  handleFeedbackWA() },
            ]
        );
    };

    const handleFeedbackWA = () => {
        const phoneNumber = "6285161070204"; // Ganti dengan nomor telepon yang sesuai
        const message = "Saya ingin memberikan saran atau request pembuatan aplikasi."; // Pesan yang ingin dikirim
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        // Membuka link WhatsApp
        Linking.openURL(url).then(() => Alert.alert("Terima kasih atas umpan balik kamu!")).catch(err => Alert.alert("Error", "Tidak dapat membuka WhatsApp."));
        
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                Aplikasi <Text style={styles.bold}>Kalkulator Cicilan</Text> dirancang untuk membantu pengguna dalam merencanakan dan
                menghitung pembayaran cicilan pinjaman. Dengan antarmuka yang sederhana dan intuitif, aplikasi ini
                memungkinkan pengguna untuk memasukkan jumlah pinjaman, suku bunga, dan tenor pinjaman untuk
                mendapatkan informasi yang jelas tentang cicilan bulanan dan rincian pembayaran selama periode pinjaman.
            </Text>

            <Text style={styles.sectionTitle}>Fitur Utama</Text>
            <View style={styles.featureList}>
                <Text style={styles.text}>1. <Text style={styles.bold}>Input Pinjaman:{'\n'}</Text>Pengguna dapat dengan mudah memasukkan jumlah pinjaman, suku bunga, dan tenor pinjaman yang diinginkan.</Text>
                <Text style={styles.text}>2. <Text style={styles.bold}>Perhitungan Otomatis:{'\n'}</Text>Aplikasi ini secara otomatis menghitung cicilan bulanan berdasarkan data yang dimasukkan.</Text>
                <Text style={styles.text}>3. <Text style={styles.bold}>Tabel Cicilan:{'\n'}</Text>Menyediakan tabel rinci yang menunjukkan pembayaran cicilan per bulan, termasuk total cicilan, pembayaran bunga, pembayaran pokok, dan sisa hutang.</Text>
                <Text style={styles.text}>4. <Text style={styles.bold}>Desain Responsif:{'\n'}</Text>Antarmuka dirancang agar responsif dan mudah digunakan di berbagai perangkat, termasuk smartphone dan tablet.</Text>
                <Text style={styles.text}>5. <Text style={styles.bold}>Ramah Pengguna:{'\n'}</Text>Dengan desain yang sederhana, pengguna dari berbagai kalangan dapat dengan mudah menggunakan aplikasi ini.</Text>
            </View>

            <Text style={styles.sectionTitle}>Manfaat Aplikasi</Text>
            <View style={styles.benefitList}>
                <Text style={styles.text}>- <Text style={styles.bold}>Perencanaan Keuangan:{'\n'}</Text>Aplikasi ini membantu pengguna dalam merencanakan keuangan mereka dengan lebih baik.</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>Pengambilan Keputusan yang Lebih Baik:{'\n'}</Text>Dengan informasi yang akurat, pengguna dapat membuat keputusan yang lebih baik terkait dengan pengambilan pinjaman.</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>Hemat Waktu:{'\n'}</Text>Aplikasi ini mempercepat proses perhitungan cicilan secara otomatis.</Text>
            </View>

            <Text style={styles.sectionTitle}>Penggunaan</Text>
            <View style={styles.usageList}>
                <Text style={styles.text}>1. <Text style={styles.bold}>Masukkan Jumlah Pinjaman:{'\n'}</Text>Input jumlah yang ingin dipinjam.</Text>
                <Text style={styles.text}>2. <Text style={styles.bold}>Masukkan Suku Bunga:{'\n'}</Text>Input suku bunga yang berlaku untuk pinjaman.</Text>
                <Text style={styles.text}>3. <Text style={styles.bold}>Masukkan Tenor:{'\n'}</Text>Pilih tenor pinjaman dalam tahun.</Text>
                <Text style={styles.text}>4. <Text style={styles.bold}>Lihat Hasil:{'\n'}</Text>Setelah mengisi semua data, aplikasi akan menampilkan cicilan bulanan dan tabel rinci pembayaran.</Text>
            </View>

            {/* <Text style={styles.sectionTitle}>Target Pengguna</Text>
            <Text style={styles.text}>
                Aplikasi ini ditujukan untuk individu yang sedang mempertimbangkan pengambilan pinjaman, baik untuk keperluan pribadi, pendidikan, maupun bisnis. 
            </Text>

            <Text style={styles.sectionTitle}>Kesimpulan</Text>
            <Text style={styles.text}>
                Aplikasi Kalkulator Cicilan adalah alat yang sangat berguna untuk membantu pengguna memahami dan merencanakan kewajiban keuangan mereka. 
            </Text> */}

            <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedback}>
                <Text style={styles.feedbackButtonText}>Kirim Umpan Balik</Text>
            </TouchableOpacity>
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
    bold: {
        fontWeight: 'bold',
        color: '#000',
    },
    featureList: {
        marginBottom: 16,
    },
    benefitList: {
        marginBottom: 16,
    },
    usageList: {
        marginBottom: 16,
    },
    feedbackButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    feedbackButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default App;
