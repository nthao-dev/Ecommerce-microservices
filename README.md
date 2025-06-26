# 📦 E-commerce Microservices with Kafka & Docker

Dự án này minh họa kiến trúc microservices theo hướng sự kiện (event-driven) sử dụng **Node.js**, **Apache Kafka** và **Docker**, dành cho hệ thống thương mại điện tử.

## 📁 Cấu trúc thư mục

```
E-ecommerce/
├── service/
│   ├── kafka/                # Cấu hình Kafka qua Docker Compose
│   ├── payment-service/      # Microservice xử lý thanh toán
│   ├── order-service/        # Microservice xử lý đơn hàng
│   ├── email-service/        # Microservice gửi email
│   ├── analytic-service/     # Microservice phân tích (consumer Kafka)
```

---

## 🚀 Hướng dẫn chạy dự án

### 1. Khởi động Kafka Cluster bằng Docker Compose

Chạy trong thư mục Kafka:

```bash
cd service/kafka
docker compose up -d
```

> 📌 Điều này sẽ khởi động:
>
> * 3 Kafka broker tại các cổng 9094, 9095, 9096
> * Giao diện Kafka UI tại: [http://localhost:8080](http://localhost:8080)

### 2. Tạo các Kafka Topic

```bash
cd ../kafka
node create-topics.js
```

Tạo các topic:

* `payment-successful`
* `order-successful`
* `email-successful` (tuỳ chọn)

---

### 3. Chạy các Microservice

Mỗi service tương tác với Kafka bằng cách gửi hoặc nhận message từ các topic.

#### ✅ Khởi động `payment-service`

```bash
cd ../payment-service
npm install
node index.js
```

> * Chạy tại `localhost:8000`
> * Gửi event: `payment-successful`

#### ✅ Khởi động `order-service`

```bash
cd ../order-service
npm install
node index.js
```

> * Lắng nghe `payment-successful`
> * Gửi event: `order-successful`

#### ✅ Khởi động `email-service`

```bash
cd ../email-service
npm install
node index.js
```

> * Lắng nghe `order-successful`
> * Gửi event: `email-successful`

#### ✅ Khởi động `analytic-service`

```bash
cd ../analytic-service
npm install
node index.js
```

> * Lắng nghe tất cả: `payment-successful`, `order-successful`, `email-successful`

---

## 🔗 Ghi chú thêm

* Kafka UI: [http://localhost:8080](http://localhost:8080)
* Kafka brokers:

  * 9094 → broker 1
  * 9095 → broker 2
  * 9096 → broker 3

---

