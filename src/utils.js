import store from "./redux/store"

export function verifyAdmin(data) {
  return data.username === process.env.REACT_APP_USERNAME && data.password === process.env.REACT_APP_PASSWORD
}

export function verifiedAccount() {
  const account = store.getState().source?.account || {}
  return account.username === process.env.REACT_APP_USERNAME && account.password === process.env.REACT_APP_PASSWORD
}

export function setLocalStorage(name, value) {
    return localStorage.setItem(name, JSON.stringify(value))
}
export function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name))
}

export const exampleData = [
    {
      "NIK": 1234567890,
      "nama": "John Doe",
      "tempatTanggalLahir": {
        "tempat": "Jakarta",
        "tanggalLahir": "1990-01-01"
      },
      "jenisKelamin": "Laki-Laki",
      "golonganDarah": "A",
      "alamat": {
        "alamat": "Jalan Contoh No. 123",
        "rtRw": "001/002",
        "kelurahanDesa": "Kota Baru",
        "kecamatan": "Pusat Kota"
      },
      "agama": "ISLAM",
      "statusPerkawinan": "KAWIN",
      "pekerjaan": "Pegawai Swasta",
      "kewarganegaraan": "WNI",
      "berlakuHingga": "2025-01-01",
      "fotoKTP": {
        "path": "/path/to/foto1.jpg",
        "typeFile": "image"
      }
    },
    {
      "NIK": 9876543210,
      "nama": "Jane Doe",
      "tempatTanggalLahir": {
        "tempat": "Surabaya",
        "tanggalLahir": "1992-05-15"
      },
      "jenisKelamin": "PEREMPUAN",
      "golonganDarah": "B",
      "alamat": {
        "alamat": "Jalan Contoh No. 456",
        "rtRw": "003/004",
        "kelurahanDesa": "Cikini",
        "kecamatan": "Menteng"
      },
      "agama": "KRISTEN",
      "statusPerkawinan": "BELUM KAWIN",
      "pekerjaan": "Wiraswasta",
      "kewarganegaraan": "WNI",
      "berlakuHingga": "2024-12-31",
      "fotoKTP": {
        "path": "/path/to/foto2.jpg",
        "typeFile": "image"
      }
    },
    {
      "NIK": 1357924680,
      "nama": "Alice Smith",
      "tempatTanggalLahir": {
        "tempat": "Bandung",
        "tanggalLahir": "1985-08-20"
      },
      "jenisKelamin": "PEREMPUAN",
      "golonganDarah": "O",
      "alamat": {
        "alamat": "Jalan Maju No. 789",
        "rtRw": "005/006",
        "kelurahanDesa": "Taman Indah",
        "kecamatan": "Cibubur"
      },
      "agama": "HINDU",
      "statusPerkawinan": "KAWIN",
      "pekerjaan": "Dokter",
      "kewarganegaraan": "WNI",
      "berlakuHingga": "2023-10-15",
      "fotoKTP": {
        "path": "/path/to/foto3.jpg",
        "typeFile": "image"
      }
    },
    {
      "NIK": 2468013579,
      "nama": "Bob Johnson",
      "tempatTanggalLahir": {
        "tempat": "Medan",
        "tanggalLahir": "1977-03-05"
      },
      "jenisKelamin": "Laki-Laki",
      "golonganDarah": "AB",
      "alamat": {
        "alamat": "Jalan Sejahtera No. 101",
        "rtRw": "007/008",
        "kelurahanDesa": "Sinar Harapan",
        "kecamatan": "Cirebon"
      },
      "agama": "BUDHA",
      "statusPerkawinan": "KAWIN",
      "pekerjaan": "Pengusaha",
      "kewarganegaraan": "WNI",
      "berlakuHingga": "2026-05-20",
      "fotoKTP": {
        "path": "/path/to/foto4.jpg",
        "typeFile": "image"
      }
    },
    {
      "NIK": 3698521470,
      "nama": "Eva Rodriguez",
      "tempatTanggalLahir": {
        "tempat": "Yogyakarta",
        "tanggalLahir": "1988-12-12"
      },
      "jenisKelamin": "PEREMPUAN",
      "golonganDarah": "A",
      "alamat": {
        "alamat": "Jalan Damai No. 555",
        "rtRw": "009/010",
        "kelurahanDesa": "Bumi Nyaman",
        "kecamatan": "Semarang"
      },
      "agama": "KHONGHUCU",
      "statusPerkawinan": "KAWIN",
      "pekerjaan": "Guru",
      "kewarganegaraan": "WNI",
      "berlakuHingga": "2024-08-08",
      "fotoKTP": {
        "path": "/path/to/foto5.jpg",
        "typeFile": "image"
      }
    }
]