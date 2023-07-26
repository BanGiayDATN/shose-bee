package com.example.shose.server.entity;

import com.example.shose.server.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Nguyễn Vinh
 */
@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
public class Address extends PrimaryEntity {

    private String line;

    private String district;

    private String province;

    private String werd;

    private Integer toDistrictId;

    @ManyToOne
    @JoinColumn(name = "id_user",referencedColumnName = "id")
    private User user;
}
