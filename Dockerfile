# Stage 1: Build ứng dụng React với Node.js
FROM node:20-alpine AS builder

# Tạo thư mục làm việc
WORKDIR /app

# Copy tệp package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn frontend vào container
COPY . .

# Build ứng dụng (Vite sẽ tạo rà thư mục /dist)
RUN npm run build

# Stage 2: Serve ứng dụng đã build bằng Nginx
FROM nginx:alpine

# Xóa cấu hình mặc định của Nginx để thay bằng cấu hình tuỳ chỉnh cho SPA
RUN rm /etc/nginx/conf.d/default.conf

# Copy file cấu hình Nginx tuỳ chỉnh
COPY nginx.conf /etc/nginx/conf.d/

# Copy các file tĩnh đã build từ stage 1 (builder) sang thư mục public của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port mặc định của Nginx
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
