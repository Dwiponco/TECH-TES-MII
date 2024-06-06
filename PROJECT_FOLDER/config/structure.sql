employee
- id PK int not null
- nik string not null
- name string not null
- is_active boolean
- start_date date not null
- end_date date not null
- created_by string not null
- updated_by string not null
- created_at date not null
- updated_at date not null

employee_profile
- id pk int not null
- employee_id int
- place_of_birth string not null
- date_of_birth date not null
- gender enum(laki-laki, perempuan)
- is_married boolean
- prof_pict string 255 null
- created_by string 255 null
- updated_by string 255 null
- created_at date not null
- updated_at date not null

employee_family
- id pk not null
- employee_id int not null
- name string 255 null
- identifier string 255 null
- job string 255 null
- place_of_birth string not null
- date_of_birth date not null
- religion enum(islam,katolik, buda, protestan, konghucu)
- is_life boolean
- is_divorced boolean
- relation_status enum(Suami, Istri, Anak, Anak Sambung)
- created_by string 255 null
- updated_by string 255 null
- created_at date not null
- updated_at date not null

education
- id pk not null
- employee_id int not null
- name string 255 null
- level enum(tk, sd, smp, sma, strata 1, strata 2, doctor, profesor)
- description string 255 null
- created_by string 255 null
- updated_by string 255 null
- created_at date not null
- updated_at date not null

