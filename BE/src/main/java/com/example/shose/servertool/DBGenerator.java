package com.example.shose.servertool;

import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.AccountVoucher;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.Brand;
import com.example.shose.server.entity.Category;
import com.example.shose.server.entity.Color;
import com.example.shose.server.entity.Customer;
import com.example.shose.server.entity.Material;
import com.example.shose.server.entity.Product;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Size;
import com.example.shose.server.entity.Sole;
import com.example.shose.server.entity.User;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.constant.GenderProductDetail;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.constant.TypeBill;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.AccountVoucherRepository;
import com.example.shose.server.repository.AddressRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.BrandRepository;
import com.example.shose.server.repository.CartDetailRepository;
import com.example.shose.server.repository.CartRepository;
import com.example.shose.server.repository.CategoryRepository;
import com.example.shose.server.repository.ColorRepository;
import com.example.shose.server.repository.CustomerRepository;
import com.example.shose.server.repository.ImageRepository;
import com.example.shose.server.repository.MaterialRepository;
import com.example.shose.server.repository.NotificationRepository;
import com.example.shose.server.repository.PaymentsMethodRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.ProductRepository;
import com.example.shose.server.repository.SizeRepository;
import com.example.shose.server.repository.SoleRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.repository.VoucherDetailRepository;
import com.example.shose.server.repository.VoucherRepository;
import com.example.shose.server.util.ConvertDateToLong;
import com.example.shose.server.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;

/**
 * @author Nguyễn Vinh
 */
@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.example.shose.server.repository")
public class DBGenerator implements CommandLineRunner {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountVoucherRepository accountVoucherRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private PaymentsMethodRepository paymentsMethodRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private SoleRepository soleRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @Autowired
    private UserReposiory userReposiory;

    @Override
    public void run(String... args) throws Exception {

        Category category = Category.builder().name("Giày Sneaker Low – top").status(Status.DANG_SU_DUNG).build();
        Category category1 = Category.builder().name("Sneaker nam nữ Mid – top").status(Status.DANG_SU_DUNG).build();
        Category category2 = Category.builder().name("Giày Sneaker Mule").status(Status.DANG_SU_DUNG).build();
        Category category3 = Category.builder().name("Giày Slip-on sneaker").status(Status.DANG_SU_DUNG).build();
        Category category4 = Category.builder().name("Sneaker High – top").status(Status.DANG_SU_DUNG).build();
        categoryRepository.save(category);
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);

        Size size = Size.builder().name("44").status(Status.DANG_SU_DUNG).build();
        Size size1 = Size.builder().name("43").status(Status.DANG_SU_DUNG).build();
        Size size2 = Size.builder().name("42").status(Status.DANG_SU_DUNG).build();
        Size size3 = Size.builder().name("41").status(Status.DANG_SU_DUNG).build();
        Size size4 = Size.builder().name("40").status(Status.DANG_SU_DUNG).build();
        Size size5 = Size.builder().name("39").status(Status.DANG_SU_DUNG).build();
        Size size6 = Size.builder().name("38").status(Status.DANG_SU_DUNG).build();
        Size size7 = Size.builder().name("37").status(Status.DANG_SU_DUNG).build();
        Size size8 = Size.builder().name("36").status(Status.DANG_SU_DUNG).build();
        sizeRepository.save(size);
        sizeRepository.save(size1);
        sizeRepository.save(size2);
        sizeRepository.save(size3);
        sizeRepository.save(size4);
        sizeRepository.save(size5);
        sizeRepository.save(size6);
        sizeRepository.save(size7);
        sizeRepository.save(size8);

        Material material = Material.builder().name("Da").status(Status.DANG_SU_DUNG).build();
        Material material1 = Material.builder().name("Thêu").status(Status.DANG_SU_DUNG).build();
        Material material2 = Material.builder().name("Tổng hợp").status(Status.DANG_SU_DUNG).build();
        Material material3 = Material.builder().name("Bọt").status(Status.DANG_SU_DUNG).build();
        Material material4 = Material.builder().name("Lưới").status(Status.DANG_SU_DUNG).build();
        materialRepository.save(material);
        materialRepository.save(material1);
        materialRepository.save(material2);
        materialRepository.save(material3);
        materialRepository.save(material4);

        Brand brand = Brand.builder().name("Adidas").status(Status.DANG_SU_DUNG).build();
        Brand brand1 = Brand.builder().name("Puma").status(Status.DANG_SU_DUNG).build();
        Brand brand2 = Brand.builder().name("Gucci").status(Status.DANG_SU_DUNG).build();
        Brand brand3 = Brand.builder().name("Converse").status(Status.DANG_SU_DUNG).build();
        Brand brand4 = Brand.builder().name("Vans").status(Status.DANG_SU_DUNG).build();
        Brand brand5 = Brand.builder().name("Balenciaga").status(Status.DANG_SU_DUNG).build();
        Brand brand6 = Brand.builder().name("Reebok").status(Status.DANG_SU_DUNG).build();
        brandRepository.save(brand);
        brandRepository.save(brand1);
        brandRepository.save(brand2);
        brandRepository.save(brand3);
        brandRepository.save(brand4);
        brandRepository.save(brand5);
        brandRepository.save(brand6);

        Color color = Color.builder().code("#800000").name("Maroon").status(Status.DANG_SU_DUNG).build();
        Color color1 = Color.builder().code("#800080").name("Purple").status(Status.DANG_SU_DUNG).build();
        Color color2 = Color.builder().code("#C0C0C0").name("Silver").status(Status.DANG_SU_DUNG).build();
        Color color3 = Color.builder().code("#FAFAD2").name("LightGoldenrodYellow").status(Status.DANG_SU_DUNG).build();
        Color color4 = Color.builder().code("#FDF5E6").name("OldLace").status(Status.DANG_SU_DUNG).build();
        Color color5 = Color.builder().code("#7B68EE").name("MediumSlateBlue").status(Status.DANG_SU_DUNG).build();
        Color color6 = Color.builder().code("#87CEEB").name("SkyBlue").status(Status.DANG_SU_DUNG).build();
        Color color7 = Color.builder().code("#8B814C").name("LightGoldenrod4").status(Status.DANG_SU_DUNG).build();
        colorRepository.save(color);
        colorRepository.save(color1);
        colorRepository.save(color2);
        colorRepository.save(color3);
        colorRepository.save(color4);
        colorRepository.save(color5);
        colorRepository.save(color6);
        colorRepository.save(color7);

        Product product1 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO ATH-1FW").status(Status.DANG_SU_DUNG).build();
        Product product2 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO ASTIR LITE M").status(Status.DANG_SU_DUNG).build();
        Product product3 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO 2ND COZMO W").status(Status.DANG_SU_DUNG).build();
        Product product4 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO 2ND COZMO W").status(Status.DANG_SU_DUNG).build();
        Product product5 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO ULT-TRN M").status(Status.DANG_SU_DUNG).build();
        Product product6 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO MX M").status(Status.DANG_SU_DUNG).build();
        Product product7 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO ST1 LITE M").status(Status.DANG_SU_DUNG).build();
        Product product8 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("ECCO STREET LITE M").status(Status.DANG_SU_DUNG).build();
        Product product9 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nam NEW04 - BSN028").status(Status.DANG_SU_DUNG).build();
        Product product10 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nữ NEW03 - BSN027").status(Status.DANG_SU_DUNG).build();
        Product product11 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nam NEW01 - BSN025").status(Status.DANG_SU_DUNG).build();
        Product product12 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nam BELSPORTS 113 - BSN021").status(Status.DANG_SU_DUNG).build();
        Product product13 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nam BELSPORTS HJ06 - BSN020").status(Status.DANG_SU_DUNG).build();
        Product product14 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nam BELSPORTS 808-BSN006").status(Status.DANG_SU_DUNG).build();
        Product product15 = Product.builder().code(new RandomNumberGenerator().randomToString("SP", 15)).name("Giày Sneakers Nữ BELSPORTS 5827-BSN007").status(Status.DANG_SU_DUNG).build();
        productRepository.save(product1);
        productRepository.save(product2);
        productRepository.save(product3);
        productRepository.save(product4);
        productRepository.save(product5);
        productRepository.save(product6);
        productRepository.save(product7);
        productRepository.save(product8);
        productRepository.save(product9);
        productRepository.save(product10);
        productRepository.save(product11);
        productRepository.save(product12);
        productRepository.save(product13);
        productRepository.save(product14);
        productRepository.save(product15);

        Sole sole1 = Sole.builder().name("Low-top").status(Status.DANG_SU_DUNG).build();
        Sole sole2 = Sole.builder().name("Mid-top").status(Status.DANG_SU_DUNG).build();
        Sole sole3 = Sole.builder().name("High-top").status(Status.DANG_SU_DUNG).build();
        Sole sole4 = Sole.builder().name("Slip-top").status(Status.DANG_SU_DUNG).build();
        soleRepository.save(sole1);
        soleRepository.save(sole2);
        soleRepository.save(sole3);
        soleRepository.save(sole4);

        ProductDetail productDetail1 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product1).size(size2)
                .gender(GenderProductDetail.NU).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail2 = ProductDetail.builder()
                .sole(sole2).category(category2).color(color2).material(material2).brand(brand2).product(product2).size(size3)
                .gender(GenderProductDetail.NAM).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail3 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product3).size(size3)
                .gender(GenderProductDetail.NAM_VA_NU).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail4 = ProductDetail.builder()
                .sole(sole4).category(category3).color(color3).material(material3).brand(brand).product(product4).size(size4)
                .gender(GenderProductDetail.NU).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail5 = ProductDetail.builder()
                .sole(sole3).category(category4).color(color7).material(material2).brand(brand).product(product5).size(size4)
                .gender(GenderProductDetail.NAM_VA_NU).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail6 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product6).size(size4)
                .gender(GenderProductDetail.NAM).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail7 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product7).size(size3)
                .gender(GenderProductDetail.NAM).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail8 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product8).size(size2)
                .gender(GenderProductDetail.NAM).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail9 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product9).size(size4)
                .gender(GenderProductDetail.NAM_VA_NU).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        ProductDetail productDetail10 = ProductDetail.builder()
                .sole(sole1).category(category).color(color).material(material).brand(brand).product(product10).size(size2)
                .gender(GenderProductDetail.NU).price(new BigDecimal("1900000")).status(Status.DANG_SU_DUNG)
                .description("Thiết kế tối giản thanh lịch cùng form dáng ôm trọn chân lấy màu trắng là chủ đạo, tự tin phối mội loại thời trang, cho dù quân dày hay ngắn đề có thể phù hợp không cần đắng đo")
                .build();
        productDetailRepository.save(productDetail1);
        productDetailRepository.save(productDetail2);
        productDetailRepository.save(productDetail3);
        productDetailRepository.save(productDetail4);
        productDetailRepository.save(productDetail5);
        productDetailRepository.save(productDetail6);
        productDetailRepository.save(productDetail7);
        productDetailRepository.save(productDetail8);
        productDetailRepository.save(productDetail9);
        productDetailRepository.save(productDetail10);


        //image

        User user1 = User.builder()
                .fullName("Nguyễn Văn Vinh").dateOfBirth(new ConvertDateToLong().dateToLong("01/06/2000")).email("vinhnvph23845@fpt.edu.vn")
                .gender(true).avata("/image/anh").phoneNumber("0378530273").status(Status.DANG_SU_DUNG)
                .build();
        User user2 = User.builder()
                .fullName("Đinh Khắc Diệm").dateOfBirth(new ConvertDateToLong().dateToLong("01/06/2003")).email("diem@gmail.com")
                .gender(true).avata("/image/anh1").phoneNumber("0963852741").status(Status.DANG_SU_DUNG)
                .build();
        User user3 = User.builder()
                .fullName("Dương Tu Thắng").dateOfBirth(new ConvertDateToLong().dateToLong("01/06/20000")).email("thangdt@fpt.edu.vn")
                .gender(true).avata("/image/anh2").phoneNumber("0987654321").status(Status.DANG_SU_DUNG)
                .build();
        userReposiory.save(user1);
        userReposiory.save(user2);
        userReposiory.save(user3);

        Account account1 = Account.builder().email(user1.getEmail()).password("123").roles(Roles.ADMIN).build();
        Account account2 = Account.builder().email(user2.getEmail()).password("123").roles(Roles.NHAN_VIEN).build();
        Account account3 = Account.builder().email(user3.getEmail()).password("123").roles(Roles.USER).build();
        accountRepository.save(account1);
        accountRepository.save(account2);
        accountRepository.save(account3);


        Customer customer1 = Customer.builder().fullName("Hà Phương Na").phoneNumber("0951753852").email("phuongna@gmail.com").status(Status.DANG_SU_DUNG).build();
        customerRepository.save(customer1);

        Bill bill1 = Bill.builder()
                .phoneNumber("0987654321").address("Thọ An - Đan Phượng - Hà Nội").userName("Nguyễn Văn A").itemDiscount(new BigDecimal("2000000"))
                .totalMoney(new BigDecimal("1800000")).completionDate(new ConvertDateToLong().dateToLong("10/05/2023"))
                .deliveryDate(new ConvertDateToLong().dateToLong("12/05/2023")).deliveryDate(new ConvertDateToLong().dateToLong("15/05/2023")).confirmationDate(new ConvertDateToLong().dateToLong("20/05/2023"))
                .typeBill(TypeBill.ONLINE).note("Đã hoàn thành").moneyShip(new BigDecimal("15000")).statusBill(StatusBill.KHONG_TRA_HANG)
                .employees(account2).account(account3)
                .build();
        Bill bill2 = Bill.builder()
                .phoneNumber("0987654321").address("Thọ An - Đan Phượng - Hà Nội").userName("Nguyễn Văn B").itemDiscount(new BigDecimal("2000000"))
                .totalMoney(new BigDecimal("1800000")).completionDate(new ConvertDateToLong().dateToLong("12/05/2023"))
                .deliveryDate(new ConvertDateToLong().dateToLong("14/05/2023")).deliveryDate(new ConvertDateToLong().dateToLong("16/05/2023")).confirmationDate(new ConvertDateToLong().dateToLong("22/05/2023"))
                .typeBill(TypeBill.ONLINE).note("Đã hoàn thành").moneyShip(new BigDecimal("15000")).statusBill(StatusBill.KHONG_TRA_HANG)
                .employees(account1).customer(customer1)
                .build();
        billRepository.save(bill1);
        billRepository.save(bill2);

        Voucher voucher1 = Voucher.builder().code(new RandomNumberGenerator().randomToString("VC",5))
                .name("Sale ngày khai trương").value(new BigDecimal(100000))
                .startDate(new ConvertDateToLong().dateToLong("25/05/2023")).endDate(new ConvertDateToLong().dateToLong("01/06/2023"))
                .quantity(100).status(Status.DANG_SU_DUNG).build();
        Voucher voucher2 = Voucher.builder().code(new RandomNumberGenerator().randomToString("VC",5))
                .name("Sale sốc").value(new BigDecimal(100000))
                .startDate(new ConvertDateToLong().dateToLong("15/06/2023")).endDate(new ConvertDateToLong().dateToLong("25/06/2023"))
                .quantity(100).status(Status.DANG_SU_DUNG).build();
        voucherRepository.save(voucher2);
        voucherRepository.save(voucher1);

        AccountVoucher accountVoucher1 = AccountVoucher.builder().account(account3).voucher(voucher1).status(Status.DANG_SU_DUNG).build();
        accountVoucherRepository.save(accountVoucher1);
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }
}
