import { Button, Input, Table, Form, Modal, Select } from 'antd'
import  { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  getAllProducts,
  putProduct,
  postProduct,
  type Product,
  deleteProduct,
  putStockProduct
} from '../redux/slices/products'
import { RiImageAddLine } from 'react-icons/ri'
import {
  getAllCategories,
  type Category
} from '../redux/slices/categories'
import Swal from 'sweetalert2'
import { formatDateTime } from '../utils/utils'

function Products() {
  const { products } = useAppSelector((state) => state.products)
  const { categories } = useAppSelector((state) => state.categories)
  const [data, setData] = useState<Product[]>([])
  const [dataFilter, setDataFilter] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [edit, setEdit] = useState(false)
  const [sell, setSell] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataEdit, setDataEdit] = useState<any>()
  const [dataSell, setDataSell] = useState<any>()
  const [formEdit] = Form.useForm()
  const [formSell] = Form.useForm()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [addData, setAddData] = useState<any>({ categoriesId: "" })
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, [])
  useEffect(() => {
    setData(products)
    setDataFilter(categories)
  }, [products, categories])
  const [imgSrcAdd, setImgSrcAdd] = useState<any>(null)
  const [imgSrc, setImgSrc] = useState<any>(null)
  const handleSearch = (value: string) => {
    setSearchQuery(value.toLowerCase())
  }

  const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(searchQuery)
  )

  const filters = dataFilter.map(el => {
    const data = {
      text: el.nombre,
      value: el.id
    }
    return data
  })

  const handleEdit = (record: Product) => {
    const newData = {
      ...record
    }
    formEdit.setFieldsValue(newData)
    setDataEdit(newData)
    setEdit(true)
    setIsModalVisible(true)
  }

  const handleVender = (record: Product) => {
    const newData = {
      ...record
    }
    formSell.setFieldsValue(newData)
    setDataSell(newData)
    setSell(true)
    setIsModalVisible(true)
  }

  const handleEditData = (values: any) => {
    const newData = {
      ...values,
      categoriesId: dataEdit.categoriesId,
      imagen: imgSrc === null ? dataEdit.imagen : imgSrc
    }
    // dispatch(updateScholarship(newData, accessToken))
    dispatch(putProduct(dataEdit?.id, newData))
    setIsModalVisible(false)
  }
  const handleAddData = (values: any) => {
    const newData = {
      ...values,
      imagen: imgSrcAdd,
      categoriesId: addData.categoriesId,
    }
    dispatch(postProduct(newData))
    setIsModalVisible(false)
    form.resetFields()
    setAddData({ categoriesId: "" })
  }

  const handleSellData = (values: any) => {
    const newData = {
      stock: Number(values.sell)
    }
    dispatch(putStockProduct(dataSell?.id, newData))
    setIsModalVisible(false)
    formSell.resetFields()
    setDataSell(null)
  }



  // const handleDelete = (id: number) => {
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'Are you sure you want to eliminate this company?',
  //     showDenyButton: true,
  //     confirmButtonText: 'Yes',
  //     denyButtonText: `No`
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteCompany(id, accessToken))
  //     }
  //   })
  // }

  const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'info',
      title: 'Estas seguro que quieres eliminar este producto?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteProduct(id))
      }
    })
  }

  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      sorter: (a: Product, b: Product) => a.nombre.localeCompare(b.nombre),
      fixed: 'left',
      width: '200px'
    },
    {
      title: "Categoria",
      dataIndex: "categoriesId",
      filters,
      onFilter: (value: string, record: any) => record.categoriesId === value,
      filterSearch: true,
      render: (id: string) => <p>
        {filters?.find(el => el.value === id)?.text}
      </p>,
      width: "150px"
    },
    {
      title: 'Precio compra',
      dataIndex: 'precioCompra',
      sorter: (a: Product, b: Product) => a.precioCompra - b.precioCompra,
      width: "150px"
    },
    {
      title: 'Precio Venta',
      dataIndex: 'precioVenta',
      sorter: (a: Product, b: Product) => a.precioVenta - b.precioVenta,
      width: "150px"
    },
    {
      title: 'Medida',
      dataIndex: 'medida',
      sorter: (a: Product, b: Product) => {
        if (a.medida && b.medida) {
          return a.medida.localeCompare(b.medida);
        } else if (a.medida) {
          return -1; // "a" tiene medida pero "b" no, "a" va primero
        } else if (b.medida) {
          return 1; // "b" tiene medida pero "a" no, "b" va primero
        }
        return 0; // ni "a" ni "b" tienen medida, no se cambia el orden
      },
      width: "150px"
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: "120px"
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      render: (text: any) =>

        typeof text == 'string' && (
          <img
            src={text}
            alt="product"
            width="150px"
            className="mx-auto object-cover rounded-md"
          />
        )
      ,
      width: "150px"
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      width: '150px',
      render: (text: any) => formatDateTime(text),
      sorter: (a: Product, b: Product) => {
        const aTimestamp = new Date(a.createdAt).getTime();
        const bTimestamp = new Date(b.createdAt).getTime();
        return aTimestamp - bTimestamp;
      },
    },
    {
      title: 'Modificado',
      dataIndex: 'updatedAt',
      width: '150px',
      sorter: (a: Product, b: Product) => {
        const aTimestamp = new Date(a.updatedAt).getTime();
        const bTimestamp = new Date(b.updatedAt).getTime();
        return aTimestamp - bTimestamp;
      },
      render: (text: any) => formatDateTime(text)
    },
    {
      title: 'Acciones',
      width: '200px',
      showOnResponse: true,
      showOnDesktop: true,
      dataIndex: '',
      render: (text: any, item: Product) => (
        <div className="flex flex-col gap-1 mx-auto justify-center items-center" key={text}>
          <Button
            className="w-[100px] bg-[#1976d3]/80 text-white"
            onClick={() => {
              handleVender(item)
            }}
          >
            Vender
          </Button>
          <Button
            className="w-[100px] "
            onClick={() => {
              handleEdit(item)
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            className="w-[100px] "
            danger
            onClick={() => {
              handleDelete(item.id)
            }}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ]

  const handleFileInputAdd = (event: any) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImgSrcAdd(reader.result)
    }
  }
  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImgSrc(reader.result)
    }
  }

  const defaultSorting = [{
    id: 'createdAt',
    desc: true,
  }];
  console.log(dataEdit)
  console.log(imgSrc)
  return (
    <div className="px-3 py-5 ">
      <h1 className="mb-3 text-3xl font-semibold">Productos</h1>
      <div className="flex flex-col justify-center items-center">
        <div
          style={{ marginBottom: 16 }}
          className="flex lg:flex-row gap-10 lg:gap-0 w-full justify-between flex-col items-center"
        >
          <Input.Search
            placeholder="Buscar por nombre..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
            className="w-full lg:w-1/2 bg-[#1976d3]/80 flex h-full p-1  rounded-xl"
          />
          <div className="flex gap-5">
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2"
              onClick={() => {
                setEdit(false)
                setSell(false)
                setIsModalVisible(true)
              }}
            >
              Agregar Producto
            </button>
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2"
              onClick={() => {
                dispatch(getAllProducts())
              }}
            >
              Refrescar
            </button>
          </div>
        </div>
        <div className="tableant flex flex-col w-full lg:w-full">
          <Table
            scroll={{ x: 1000, y: 800 }}
            columns={columns}
            dataSource={filteredData.map((data, index) => ({
              ...data,
              key: index
            }))}
            defaultSorted={defaultSorting}
          />
        </div>
      </div>
      <Modal
        centered
        style={{
          marginTop: '20px',
          marginBottom: '20px'
        }}
        bodyStyle={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)',
          paddingRight: '20px'
        }}
        title={edit ? 'Modificar producto' : sell ? "Vender producto" : 'Agregar producto'}
        open={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false)
          setDataEdit(null)
          setDataSell(null)
        }}
      >{sell && (
        <Form onFinish={handleSellData} form={formSell}>
          <Form.Item name="nombre" label="Nombre">
            <Input disabled className='disabled:bg-white disabled:text-black' />
          </Form.Item>
          <Form.Item name="precioCompra" label="Precio Compra">
            <Input type="number" disabled className='disabled:bg-white disabled:text-black' />
          </Form.Item>
          <Form.Item name="precioVenta" label="Precio Venta">
            <Input type="number" disabled className='disabled:bg-white disabled:text-black' />
          </Form.Item>
          <Form.Item name="medida" label="Medida">
            <Input disabled className='disabled:bg-white disabled:text-black' />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <Input type="number" disabled className='disabled:bg-white disabled:text-black' />
          </Form.Item>
          {dataSell && typeof dataSell.imagen === 'string' && <img
            src={dataSell.imagen}
            alt="producto"
            className="w-[120px] mx-auto object-cover mb-5 rounded-md"
          />}
          <Form.Item name="sell" label="Cuantas unidades?" rules={[{ required: true, pattern: /^[1-9]\d*$/, message: "Numeros mayores a 0" }]}>
            <Input type="number" />
          </Form.Item>
          <button
            className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full disabled:bg-slate-400"
            type="submit"
          >
            Vender producto
          </button>
        </Form>
      )}
        {edit && dataEdit !== null && (
          <Form
            layout="vertical"
            onFinish={handleEditData}
            form={formEdit}
          >
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Select
                onChange={(value, label: any) => {
                  console.log(value)
                  setDataEdit({
                    ...dataEdit,
                    categoriesId: label.value
                  })
                }}
                value={dataEdit?.categoriesId}
                options={filters.map((el) => {
                  return {
                    label: el.text,
                    value: el.value,
                    element: el
                  }
                })}
              />
            </Form.Item>
            <Form.Item name="precioCompra" label="Precio Compra" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="precioVenta" label="Precio Venta" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="medida" label="Medida">
              <Input />
            </Form.Item>
            <Form.Item name="stock" label="Stock">
              <Input type="number" />
            </Form.Item>
            <label
              htmlFor="changeImage"
              className="relative flex justify-center items-center mb-3 group w-[150px] h-[150px] mx-auto"
            >
              {imgSrc == null && dataEdit.imagen !== null ? (
                <img
                  src={dataEdit.imagen}
                  alt="producto"
                  className="w-[150px] h-[150px] object-contain mx-auto rounded-md hover:brightness-50 duration-300 cursor-pointer"
                />
              ) : imgSrc == null && dataEdit.imagen === null ? (<div className="w-[100%] h-[100%] rounded-md flex justify-center items-center hover:bg-black cursor-pointer border-2 shadow-md">Cambiar imagen</div>) : (
                <img
                  src={imgSrc}
                  alt="producto"
                  className="w-[150px] h-[150px] object-cover mx-auto rounded-md hover:brightness-50 duration-300 cursor-pointer"
                />
              )}

              <div className="absolute pointer-events-none">
                <h1 className="text-center text-white font-medium hidden group-hover:block">
                  Cambiar imagen
                </h1>
              </div>
            </label>
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full disabled:bg-slate-50"
              type="submit"
              disabled={dataEdit.categoriesId === ""}
            >
              Modificar producto
            </button>
          </Form>
        )}
        {(!edit && !sell) && (
          <Form onFinish={handleAddData} form={form} layout="vertical">
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Select
                placeholder="Seleccione categoria"
                onChange={(value, label: any) => {
                  console.log(value)
                  setAddData({
                    ...addData,
                    categoriesId: label.value
                  })
                }}
                value={addData?.categoriesId}
                options={filters.map((el) => {
                  return {
                    label: el.text,
                    value: el.value,
                    element: el
                  }
                })}
              />
            </Form.Item>
            <Form.Item name="precioCompra" label="Precio Compra" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="precioVenta" label="Precio Venta" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="medida" label="Medida">
              <Input />
            </Form.Item>
            <Form.Item name="stock" label="Stock">
              <Input type="number" />
            </Form.Item>
            <div className="flex justify-around items-center mb-4">
              <label
                htmlFor="addImage"
                className="bg-white cursor-pointer w-[120px] h-[120px] p-3 shadow-md flex justify-center flex-col items-center rounded-t-md"
              >
                <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                <span className="text-sm mx-auto text-center text-[#0061dd]">
                  Agregar imagen
                </span>{' '}
              </label>
              {imgSrcAdd && (
                <img
                  src={imgSrcAdd}
                  alt="producto"
                  className="w-[120px] h-[120px] object-cover rounded-md"
                />
              )}
            </div>

            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full disabled:bg-slate-400"
              type="submit"
              disabled={addData.categoriesId === ""}
            >
              Agregar producto
            </button>
          </Form>
        )}
      </Modal>
      <input
        type="file"
        id="changeImage"
        name="changeImage"
        onChange={handleFileInputChange}
        className="addImage hidden"
      />
      <input
        type="file"
        id="addImage"
        name="addImage"
        onChange={handleFileInputAdd}
        className="addImage hidden"
      />
    </div>
  )
}

export default Products
