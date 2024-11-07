// Notification
// Mảng mẫu thông báo với loại biểu tượng
const notifications = [
  { message: "Người dùng A đã bình luận vào bài viết của bạn.", icon: "💬" },
  { message: "Bạn có tin nhắn mới từ B.", icon: "✉️" },
  { message: "Cập nhật mới từ chủ đề bạn theo dõi.", icon: "🔔" },
  { message: "Người dùng C đã thích bài viết của bạn.", icon: "❤️" }
];

// Khi bắt đầu thì sẽ mặc định ẩn dropdown
window.addEventListener("load", () => {
  const dropdown = document.getElementById("notification-dropdown");
  dropdown.style.display = "none"; // Ẩn dropdown khi tải trang
});
// Hiển thị hoặc ẩn dropdown thông báo
function toggleNotifications() {
  const dropdown = document.getElementById("notification-dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  updateNotificationList();
}

// Cập nhật danh sách thông báo
function updateNotificationList() {
  const notificationList = document.getElementById("notification-list");
  notificationList.innerHTML = ""; // Xóa thông báo cũ

  notifications.forEach((item) => {
      const listItem = document.createElement("li");

      // Thêm biểu tượng và nội dung thông báo
      listItem.innerHTML = `<span class="notification-icon">${item.icon}</span><span>${item.message}</span>`;
      notificationList.appendChild(listItem);
  });
}

// Xóa tất cả thông báo
function clearNotifications() {
  notifications.length = 0;
  updateNotificationList();
}

// Ẩn dropdown khi nhấp ra ngoài
document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("notification-dropdown");
  const bellIcon = document.getElementById("bell-icon");
  if (!dropdown.contains(event.target) && event.target !== bellIcon) {
      dropdown.style.display = "none";
  }
});


// search
// Dữ liệu mẫu cho gợi ý tìm kiếm
const data = [ 
  { keyword: "Toán học", type: "Bài viết", icon: "📘" },
  { keyword: "Vật lý", type: "Hình ảnh", icon: "📸" },
  { keyword: "Lịch sử Việt Nam", type: "Video", icon: "🎥" },
  { keyword: "Địa lý thế giới", type: "Bài viết", icon: "📘" },
  { keyword: "Tiếng Anh cơ bản", type: "Tài liệu", icon: "📄" }
];

// Hàm cập nhật gợi ý khi nhập từ khóa
function updateSuggestions() {
  const input = document.querySelector('.search-input').value.toLowerCase();
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = '';  // Xóa các gợi ý cũ

  if (input) {
      const filteredSuggestions = data.filter(item => 
          item.keyword.toLowerCase().includes(input)
      );

      filteredSuggestions.forEach(item => {
          const listItem = document.createElement('li');
          listItem.classList.add('suggestion-item');
          listItem.onclick = () => selectSuggestion(item.keyword);

          // Hiển thị icon, từ khóa và loại gợi ý
          listItem.innerHTML = `
              <span class="suggestion-icon">${item.icon}</span>
              <span>${highlightKeyword(item.keyword, input)}</span>
              <small style="margin-left: auto; color: #888;">(${item.type})</small>
          `;

          suggestionsList.appendChild(listItem);
      });

      // Hiển thị danh sách nếu có gợi ý
      suggestionsList.style.display = filteredSuggestions.length ? 'block' : 'none';
  } else {
      suggestionsList.style.display = 'none';
  }
}

// Hàm để chọn gợi ý và điền vào ô tìm kiếm
function selectSuggestion(keyword) {
  document.querySelector('.search-input').value = keyword;
  document.getElementById('suggestions-list').style.display = 'none';
}

// Hàm đánh dấu từ khóa tìm kiếm
function highlightKeyword(keyword, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return keyword.replace(regex, '<span class="highlight">$1</span>');
} 

// Ẩn gợi ý khi nhấp ra ngoài
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-container')) {
      document.getElementById('suggestions-list').style.display = 'none';
  }
});
