const btnTmbh = document.getElementById("btn-tambah");
const btnBatal = document.querySelector("#btn-batal");
const btnBatalEdit = document.querySelector("#btn-batal-edit");
const btnUpdate = document.getElementById("btn-update");
const userList = document.getElementById("user-list");

// Penjelasan variable

// btnTmbh: Merujuk pada tombol "Tambah" untuk membuka modal input.
// btnBatal: Merujuk pada tombol "Batal" untuk menutup modal tambah.
// btnBatalEdit: Merujuk pada tombol "Batal" untuk menutup modal edit.
// btnUpdate: Merujuk pada tombol "Update" untuk menyimpan perubahan saat mengedit data.
// userList: Merujuk pada elemen <tbody> (atau elemen yang digunakan untuk menampilkan daftar pengguna).

//Penjelasan fungsi saveUsers

// Tujuan: Menyimpan data pengguna ke localStorage.
// Proses:
// Membuat array kosong users.
// Mengiterasi setiap baris (row) dalam userList.
// Mengambil nama dan NIM dari sel yang sesuai.
// Menambahkan objek { name, nim } ke dalam array users.
// Menggunakan localStorage.setItem untuk menyimpan array users sebagai string JSON.

//Penjelasan fungsi loadUsers

// Tujuan: Memuat data pengguna dari localStorage saat halaman dimuat.
// Proses:
// Mengambil data pengguna dari localStorage dan mengonversi dari string JSON ke objek JavaScript.
// Jika tidak ada data, menggunakan array kosong sebagai fallback.
// Mengiterasi setiap pengguna dan membuat elemen <tr> untuk menampilkannya dalam tabel.
// Menambahkan tombol "Edit" dan "Delete" dengan atribut data untuk nama dan NIM.

function saveUsers() {
  const users = [];
  for (const row of userList.children) {
    const name = row.cells[1].innerText;
    const nim = row.cells[2].innerText;
    users.push({ name, nim });
  }
  localStorage.setItem("users", JSON.stringify(users));
}

// Fungsi untuk memuat data dari localStorage
function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.nim}</td>
        <td>
            <button class="btn-edit" data-nama="${user.name}" data-nim="${
      user.nim
    }">Edit</button>
            <button class="btn-delete">Delete</button>
        </td>
    `;
    userList.appendChild(newRow);
  });
}

// Penjelasan LoadUsers

// Memanggil fungsi loadUsers() untuk menampilkan data pengguna yang sudah disimpan ketika halaman pertama kali dimuat.

loadUsers();

// Penjelasan btnTmbh.addEventListener

// Menampilkan modal untuk menambah pengguna ketika tombol "Tambah" diklik.

btnTmbh.addEventListener("click", () => {
  document.getElementById("modal-tambah").style.display = "flex";
});

// Penjelasan btnSimpan.addEventListener

// Mengambil nilai dari input nama dan NIM ketika tombol "Simpan" diklik.
// Membuat baris baru dan menambahkannya ke dalam tabel userList.
// Menyembunyikan modal dan mereset input.
// Memanggil saveUsers() untuk menyimpan data ke localStorage.

document.getElementById("btn-simpan").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const nim = document.getElementById("nim").value;

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${userList.children.length + 1}</td>
        <td>${name}</td>
        <td>${nim}</td>
        <td>
            <button class="btn-edit" data-nama="${name}" data-nim="${nim}">Edit</button>
            <button class="btn-delete">Delete</button>
        </td>
    `;

  userList.appendChild(newRow);
  document.getElementById("modal-tambah").style.display = "none";

  // Reset input fields
  document.getElementById("name").value = "";
  document.getElementById("nim").value = "";

  // Simpan ke localStorage
  saveUsers();
});

// Penjelasan btnBatal.addEventListener

// Menyembunyikan modal tambah jika tombol "Batal" diklik.

btnBatal.addEventListener("click", () => {
  document.getElementById("modal-tambah").style.display = "none";
});

// Penjelasan userList.addEventListener

// Mengatur event listener pada elemen userList untuk menangani klik pada tombol "Edit" dan "Delete".
// Jika tombol "Edit" diklik:
// Mengambil nama dan NIM dari atribut data dan mengisinya ke dalam input di modal edit.
// Menyimpan indeks baris untuk digunakan saat memperbarui.
// Jika tombol "Delete" diklik:
// Menampilkan modal konfirmasi untuk menghapus.
// Menghapus baris jika konfirmasi diterima dan menyimpan perubahan ke localStorage.

userList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    const button = e.target;
    const nama = button.getAttribute("data-nama");
    const nim = button.getAttribute("data-nim");

    document.getElementById("edit-name").value = nama;
    document.getElementById("edit-nim").value = nim;

    const rowIndex = Array.from(userList.children).indexOf(
      button.closest("tr")
    );
    document.getElementById("modal-edit").dataset.rowIndex = rowIndex;

    document.getElementById("modal-edit").style.display = "flex";
  }

  if (e.target.classList.contains("btn-delete")) {
    const row = e.target.closest("tr");
    document.getElementById("modal-hapus").style.display = "flex";

    document.getElementById("btn-hapus-confirm").onclick = () => {
      userList.removeChild(row);
      document.getElementById("modal-hapus").style.display = "none";

      // Simpan perubahan ke localStorage
      saveUsers();

      // Tampilkan pop-up
      const popupMessage = document.getElementById("popup-message");
      popupMessage.style.display = "block";

      document.querySelector(".btn").onclick = () => {
        popupMessage.style.display = "none";
      };
    };

    document.getElementById("btn-batal-cancel").onclick = () => {
      document.getElementById("modal-hapus").style.display = "none";
    };
  }
});

// Penjelasan btnUpdate.addEventListener

// Mengambil indeks baris yang akan diperbarui.
// Memperbarui nama dan NIM di sel yang sesuai.
// Menyembunyikan modal edit dan menyimpan perubahan ke localStorage.

btnUpdate.addEventListener("click", () => {
  const rowIndex = document.getElementById("modal-edit").dataset.rowIndex;
  const updatedName = document.getElementById("edit-name").value;
  const updatedNim = document.getElementById("edit-nim").value;

  const row = userList.children[rowIndex];
  row.cells[1].innerText = updatedName;
  row.cells[2].innerText = updatedNim;

  document.getElementById("modal-edit").style.display = "none";

  // Simpan perubahan ke localStorage
  saveUsers();
});

// Penjelasan btnBatalEdit.addEventListener

// Menyembunyikan modal edit jika tombol "Batal" diklik.

btnBatalEdit.addEventListener("click", () => {
  document.getElementById("modal-edit").style.display = "none";
});

// Note : Saya membuat fungsi diatas dengan bantuan AI ChatGPT untuk memudahkan pengerjaan,
// walaupun dibantu dengan AI saya juga belajar memahami apa yg sudah dibuat.

// Dikarenakan saya belum terlalu mahir dalam bahasa pemrograman JavaScript hehehehehe.

// Terima Kasih.
