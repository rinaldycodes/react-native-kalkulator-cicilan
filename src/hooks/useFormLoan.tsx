import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalFunction from '../utils/functions/GlobalFunction';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { router } from 'expo-router';
import ExportStorage from '../utils/storages/ExportStorage';
import GlobalStorage from '../utils/storages/GlobalStorage';

export default function useFormLoan() {
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [loanTenor, setLoanTenor] = useState<string>('');
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);

    const [loanAmountPure, setLoanAmountPure] = useState<string | number>('');
    const [interestRatePure, setInterestRatePure] = useState<string>('');
    const [loanTenorPure, setLoanTenorPure] = useState<string>('');
    const [monthlyPaymentPure, setMonthlyPaymentPure] = useState<string | null>(null);

    useEffect(() => {
        calculateLoan(); // Panggil fungsi calculateLoan setiap kali salah satu nilai berubah
    }, [loanAmount, interestRate, loanTenor]);

    const hitungSukuBunga = (interestRate: any) => {
        return parseFloat(interestRate) / 100 / 12;
    }

    // Fungsi untuk mengubah input ke format Rupiah
    const formatInputToRupiah = (input: string) => {
        // Menghilangkan karakter yang bukan angka
        const numberString = input.replace(/[^0-9]/g, '');
        const numberValue = parseFloat(numberString);
        return isNaN(numberValue) ? '' : GlobalFunction.formateToRupiah(numberValue);
    };

    // Fungsi untuk menghitung cicilan bulanan
    const calculateLoan = () => {
        const P = parseFloat(loanAmount.replace(/[^0-9]/g, '')); // Menghilangkan format Rupiah untuk perhitungan
        const r = hitungSukuBunga(interestRate);
        const n = parseFloat(loanTenor) * 12;

        console.log("loanAmountPure", P);
        setLoanAmountPure(P);

        if (!isNaN(P) && !isNaN(r) && !isNaN(n) && r > 0 && n > 0) {
            const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyPaymentPure(monthlyPayment);
            setMonthlyPayment(GlobalFunction.formateToRupiah(monthlyPayment)); // Format cicilan bulanan ke Rupiah
        } else {
            setMonthlyPayment(null);
        }
    };

    // Handler untuk perubahan input loanAmount
    const handleLoanAmountChange = (value: string) => {
        setLoanAmount(formatInputToRupiah(value)); // Set input dengan format Rupiah
    };

    // Handler untuk perubahan input interestRate
    const handleInterestRateChange = (value: string) => {
        setInterestRate(value);
    };

    // Handler untuk perubahan input loanTenor
    const handleLoanTenorChange = (value: string) => {
        setLoanTenor(value);
    };

    const generateHTML = async () => {
        const P = parseFloat(loanAmountPure as string); // Nilai pinjaman
        const r = hitungSukuBunga(interestRate);
        const n = parseFloat(loanTenor) * 12; // Jumlah bulan (tenor)
        let totalMonthlyPayment = 0;
        let totalInterestPayment = 0;
        let totalPrincipalPayment = 0;
        let totalRemainingAmount = 0;

        let remainingAmount = P;
        let rows = '';
        for (let i = 1; i <= n; i++) {
            const interestPayment = remainingAmount * r; // Pembayaran bunga bulan ini
            const principalPayment = parseFloat(monthlyPaymentPure as string) - interestPayment; // Pembayaran pokok bulan ini
            remainingAmount -= principalPayment; // Sisa hutang setelah pembayaran pokok

            rows += `
                <tr>
                    <td>${i}</td>
                    <td>${(monthlyPayment!)}</td>
                    <td>${(GlobalFunction.formateToRupiah(interestPayment.toFixed(2)))}</td>
                    <td>${(GlobalFunction.formateToRupiah(principalPayment.toFixed(2)))}</td>
                    <td>${(remainingAmount > 0 ? GlobalFunction.formateToRupiah(remainingAmount.toFixed(2)) : 0)}</td>
                </tr>
            `;

            totalMonthlyPayment += parseFloat(monthlyPaymentPure.toFixed(2));
            totalInterestPayment += parseFloat(interestPayment.toFixed(2));
            totalPrincipalPayment += parseFloat(principalPayment.toFixed(2));
            totalRemainingAmount += parseFloat(remainingAmount.toFixed(2));
        }

        const html = `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                <style>
                    body {
                        text-align: left;
                        font-family: 'Arial', sans-serif;
                        margin: 20px;
                        background-color: #f9f9f9;
                    }
                    h1 {
                        font-size: 36px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    h3 {
                        font-size: 24px;
                        font-weight: normal;
                        color: #555;
                        margin-top: 20px;
                    }
                    p {
                        font-size: 16px;
                        color: #333;
                    }
                table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        table, th, td {
                            border: 1px solid black;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        td {
                            text-align: right;
                        }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 14px;
                        color: #777;
                    }
                </style>
                <style type="text/css" media="print">
                    @page {
                        size: auto;   /* auto is the initial value */
                        margin: 0;  /* this affects the margin in the printer settings */
                    }
                        
                    @media print {
                        @page {
                                margin-top: 0;
                                margin-bottom: 0;
                        }
                        body {
                            padding-top: 0px;
                            padding-bottom: 0px ;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>Kalkulator Cicilan!</h1>
                <p><strong>Jumlah Pinjaman:</strong> ${loanAmount}</p>
                <p><strong>Suku Bunga:</strong> ${interestRate}%</p>
                <p><strong>Tenor:</strong> ${loanTenor} tahun</p>
                <p><strong>Cicilan Bulanan:</strong> ${monthlyPayment}</p>

                <table>
                    <thead>
                        <tr>
                            <th>Bulan</th>
                            <th>Total Cicilan</th>
                            <th>Pembayaran Bunga</th>
                            <th>Pembayaran Pokok</th>
                            <th>Sisa Hutang</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>

                <div class="footer">
                    <p>Terima kasih telah menggunakan Kalkulator Cicilan kami!</p>
                </div>

                <script>
                    if ( ${Platform.OS == 'web'} ) {
                        window.print();
                    }
                </script>
            </body>
        </html>
        `;

        return html;
    }

    const exportPDFWeb = async () => {
        
        try {
            const html = await generateHTML();

            const isStored = await GlobalStorage.storeData('html', html);
            if ( isStored ) {
                router.navigate('/export-detail');
            } else {
                alert("Silahkan coba beberapa saat lagi");
            }
            // router.navigate({
            //     pathname: '/export-detail',
            //     params: {
            //         html: html
            //     }
            // })

        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    }

    const exportPDFNative = async () => {
        
        try {
            const html = await generateHTML()
            const { uri } = await Print.printToFileAsync({
                html: html,
                base64: false,
            });

            console.log('PDF berhasil dibuat di lokasi: ', uri);

            // Opsi: Bagikan PDF setelah dibuat
            await shareAsync(uri);
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    }

    const exportPDF = async () => {
        if ( Platform.OS != 'web') {
            await exportPDFNative();

        } else {
            exportPDFWeb()
        }
    };

    return {
        // STATE
        loanAmount,
        handleLoanAmountChange,
        interestRate,
        handleInterestRateChange,
        loanTenor,
        handleLoanTenorChange,
        monthlyPayment,

        // FUNCTIONS
        calculateLoan,
        exportPDF
    };
}

const styles = StyleSheet.create({});
