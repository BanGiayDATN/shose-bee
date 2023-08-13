package com.example.shose.server.repository;

import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailDTOResponse;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.productdetail.GetDetailProductOfClient;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByCategory;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.entity.Product;
import com.example.shose.server.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, String> {


    @Query(value = """
                SELECT
                   ROW_NUMBER() OVER (ORDER BY detail.last_modified_date DESC) AS stt,
                   detail.id AS id,
                   i.name AS image,
                   CONCAT(p.name ,'[ ',s2.name,' - ',c2.name,' ]') AS nameProduct,
                   detail.price AS price,
                   detail.created_date AS created_date,
                   detail.gender AS gender,
                   detail.status AS status,
                   si.name AS nameSize,
                   c.name AS nameCategory,
                   b.name AS nameBrand,
                   detail.quantity AS quantity,
                   AVG(pr.value) AS promotion,
                   detail.quantity,
                   s2.name AS size,
                   c2.code AS color,
                   detail.maqr AS QRCode
                FROM product_detail detail
                JOIN product p ON detail.id_product = p.id
                JOIN (
                    SELECT id_product_detail, MAX(id) AS max_image_id
                    FROM image
                    GROUP BY id_product_detail
                ) max_images ON detail.id = max_images.id_product_detail
                LEFT JOIN image i ON max_images.max_image_id = i.id
                JOIN sole s ON s.id = detail.id_sole
                JOIN material m ON detail.id_material = m.id
                JOIN category c ON detail.id_category = c.id
                JOIN brand b ON detail.id_brand = b.id
                LEFT JOIN promotion_product_detail ppd on detail.id = ppd.id_product_detail
                LEFT JOIN promotion pr on pr.id = ppd.id_promotion
                JOIN size s2 on detail.id_size = s2.id
                JOIN color c2 on detail.id_color = c2.id
                LEFT JOIN size si ON detail.id_size = si.id
                WHERE i.status = true  
                AND p.id = :#{#req.idProduct}
                AND  ( :#{#req.size} = 0 OR s2.name = :#{#req.size} OR :#{#req.size} = '' )
                AND  ( :#{#req.color} IS NULL OR c2.code LIKE %:#{#req.color}% OR :#{#req.color} LIKE '' )
                AND  ( :#{#req.brand} IS NULL OR b.name LIKE %:#{#req.brand}% OR :#{#req.brand} LIKE '' )
                AND  ( :#{#req.material} IS NULL OR :#{#req.material} LIKE '' OR m.name LIKE %:#{#req.material}% ) 
                AND  ( :#{#req.product} IS NULL OR :#{#req.product} LIKE ''  OR p.name LIKE %:#{#req.product}% ) 
                AND  ( :#{#req.sole} IS NULL  OR :#{#req.sole} LIKE '' OR s.name LIKE %:#{#req.sole}% )
                AND  ( :#{#req.category} IS NULL OR :#{#req.category} LIKE '' OR c.name LIKE %:#{#req.category}% )
                AND  ( :#{#req.status} IS NULL   OR :#{#req.status} LIKE '' OR detail.status LIKE :#{#req.status} )
                AND  ( :#{#req.gender} IS NULL OR :#{#req.gender} LIKE '' OR detail.gender LIKE :#{#req.gender} )
                AND  ( :#{#req.minPrice} IS NULL OR detail.price >= :#{#req.minPrice} ) 
                AND  ( :#{#req.maxPrice} IS NULL OR detail.price <= :#{#req.maxPrice} )
                GROUP BY detail.id, i.name, p.name, s2.name, c2.name, detail.price, detail.created_date, detail.gender, detail.status, si.name, c.name, b.name, detail.quantity, s2.name, c2.code
                ORDER BY detail.last_modified_date DESC 
            """, nativeQuery = true)
    List<ProductDetailReponse> getAll(@Param("req") FindProductDetailRequest req);

    @Query(value = """

             SELECT 
                               detail.id AS id,
                               i.name AS image,
                               p.code AS codeProduct,
                               p.name AS nameProduct,
                               detail.price AS price,
                               detail.created_date AS created_date,
                               detail.gender AS gender,
                               detail.status AS status,
                               co.code AS codeColor,
                               s.name AS nameSize
                             
                        FROM product_detail detail
                        LEFT JOIN promotion_product_detail ppd on detail.id = ppd.id_product_detail
                        LEFT JOIN promotion pr on pr.id = ppd.id_promotion
                        JOIN product p on detail.id_product = p.id
                        JOIN (
                        SELECT id_product_detail, MAX(id) AS max_image_id
                        FROM image
                        GROUP BY id_product_detail
                        ) max_images ON detail.id = max_images.id_product_detail
                        LEFT JOIN image i ON max_images.max_image_id = i.id
                        JOIN color co on co.id = detail.id_color
                         JOIN size s on s.id = detail.id_size
                        where p.id = :id 
                        group by detail.id
            """, nativeQuery = true)
    List<GetProductDetailByProduct> getByIdProduct(@Param("id") String id);


    @Query(value = """
             SELECT  ROW_NUMBER() OVER (ORDER BY detail.last_modified_date DESC) AS stt,
                    detail.id AS id,
                    i.name AS image,
                    p.code AS codeProduct,
                    p.name AS nameProduct,
                     pr.value AS promotion,
                    s.name AS nameSole,
                    m.name AS nameMaterial,
                    c.name AS nameCategory,
                    b.name AS nameBrand,
                    detail.quantity,
                    detail.price AS price,
                    detail.created_date AS created_date,
                    detail.gender AS gender,
                    detail.status AS status,
                    si.name AS nameSize,
                    col.code AS color,
                    detail.maqr AS QRCode
             FROM product_detail detail
             LEFT JOIN product p on detail.id_product = p.id
             LEFT JOIN image i on detail.id = i.id_product_detail
             LEFT JOIN sole s ON s.id = detail.id_sole
             LEFT JOIN material m ON detail.id_material = m.id
             LEFT JOIN promotion_product_detail ppd on detail.id = ppd.id_product_detail
             LEFT JOIN promotion pr on pr.id = ppd.id_promotion
             LEFT JOIN category c ON detail.id_category = c.id
             LEFT JOIN brand b ON detail.id_brand = b.id
             LEFT JOIN color col ON detail.id_color = col.id
             LEFT JOIN size si ON detail.id_size = si.id
            where p.id = :id
            GROUP BY detail.id
            ORDER BY detail.last_modified_date DESC 
            """, nativeQuery = true)
    List<ProductDetailReponse> findAllByIdProduct(@Param("id") String id);

    @Query(value = """
            SELECT
            p.id as idProduct,
             pd.id as idProductDetail,
            REPLACE(c.code, '#', '%23') as codeColor,
             i.name as image,
             p.name as nameProduct,
             pd.price as price,
             po.value as valuePromotion
             
             from product_detail pd
             JOIN image i on i.id_product_detail = pd.id
             LEFT JOIN promotion_product_detail ppd on pd.id = ppd.id_product_detail
             LEFT JOIN promotion po on po.id = ppd.id_promotion
             JOIN product p on pd.id_product = p.id
             JOIN color c on c.id = pd.id_color
            JOIN category ca on ca.id = pd.id_category
            where ca.id = :id

            """, nativeQuery = true)
    List<GetProductDetailByCategory> getProductDetailByCategory(@Param("id") String id);


    @Query( value = """

            SELECT
            p.id as idProduct,
            GROUP_CONCAT(i.name)as image,
             p.name as nameProduct,
             pd.price as price,
             pd.quantity as quantity,
             REPLACE(c.code, '#', '%23') as codeColor,
             (select GROUP_CONCAT(REPLACE(co.code, '#', '%23'))from color co where co.code in( 
               SELECT c2.code
                FROM  product p2 
                JOIN product_detail pd2 ON p2.id = pd2.id_product  
                JOIN color c2 ON c2.id = pd2.id_color
              WHERE p2.id = p.id
                ))
              as listCodeColor,
                
             (select GROUP_CONCAT(s.name) FROM size s WHERE s.name in( 
               SELECT s2.name
                FROM color c3 
                JOIN product_detail pd3 ON c3.id =  pd3.id_color 
                 JOIN product p3 ON p3.id = pd3.id_product  
                JOIN size s2 ON s2.id = pd3.id_size
                WHERE c3.code = c.code AND p3.id = p.id
                ))
              as listNameSize
             from product_detail pd
             left JOIN image i on i.id_product_detail = pd.id
             JOIN product p on pd.id_product = p.id
             JOIN color c on c.id = pd.id_color
             JOIN size s on s.id = pd.id_size
            where p.id = :id and c.code = :codeColor
            """, nativeQuery = true)
    GetDetailProductOfClient getDetailProductOfClient(@Param("id")String id,@Param("codeColor") String codeColor);

    @Query(value = """
                SELECT
                   detail.id AS id,
                   i.name AS image,
                   p.name AS nameProduct,
                   detail.description AS description,
                   b.id AS idBrand,
                   s.id AS idSole,
                   c.id AS idCategory,
                   detail.status AS status,
                   m.id AS idMaterial,
                   detail.gender AS gender,
                   detail.quantity AS quantity,
                   detail.price AS price,
                   c2.id AS idCode,
                   s2.id AS idSize,
                   detail.maqr AS QRCode
                FROM product_detail detail
                JOIN product p ON detail.id_product = p.id
                JOIN (
                    SELECT id_product_detail, MAX(id) AS max_image_id
                    FROM image
                    GROUP BY id_product_detail
                ) max_images ON detail.id = max_images.id_product_detail
                LEFT JOIN image i ON max_images.max_image_id = i.id
                JOIN sole s ON s.id = detail.id_sole
                JOIN material m ON detail.id_material = m.id
                JOIN category c ON detail.id_category = c.id
                JOIN brand b ON detail.id_brand = b.id
                JOIN size s2 on detail.id_size = s2.id
                JOIN color c2 on detail.id_color = c2.id
                LEFT JOIN size si ON detail.id_size = si.id
                WHERE  detail.id = :id
            """, nativeQuery = true)

    ProductDetailDTOResponse getOneById(@Param("id") String id);


}