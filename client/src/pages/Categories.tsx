import { Button, Input, Table, Form, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  getAllCategories,
  putCategory,
  postCategory,
  deleteCategory,
  type Category
} from '../redux/slices/categories'
import Swal from 'sweetalert2'
import { formatDateTime } from '../utils/utils'

function Categories() {
  const { categories } = useAppSelector((state) => state.categories)
  const [data, setData] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [edit, setEdit] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataEdit, setDataEdit] = useState<Category | null>()
  const [formEdit] = Form.useForm()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
    const [addData, setAddData] = useState<any>()
    console.log(addData)
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  useEffect(() => {
    setData(categories)
  }, [categories])

  const handleSearch = (value: string) => {
    setSearchQuery(value.toLowerCase())
  }

  const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(searchQuery)
  )

  const handleEdit = (record: Category) => {
    const newData = {
      ...record
    }
    formEdit.setFieldsValue(newData)
    setDataEdit(newData)
    setEdit(true)
    setIsModalVisible(true)
  }

  const handleEditData = (values: any) => {
    const newData = {
      ...values,
      id: dataEdit?.id
    }
    // dispatch(updateScholarship(newData, accessToken))
    dispatch(putCategory(dataEdit?.id,newData))
    setIsModalVisible(false)
  }
  const handleAddData = (values: any) => {
    const newData = {
      ...values
    }
    dispatch(postCategory(newData))
    setIsModalVisible(false)
    form.resetFields()
    setAddData(null)
  }

 const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'info',
      title: 'Estas seguro que quieres eliminar este categoria?',
      text:"TODOS LOS PRODUCTOS SERAN ELIMINADOS",
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteCategory(id))
      }
    })
  }

  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      sorter: (a: Category, b: Category) => a.nombre.localeCompare(b.nombre),
      fixed: 'left',
      width: '200px'
    },
    {
      title: 'Cantidad de Productos',
      dataIndex: 'cantidad_productos',
      sorter: (a: Category, b: Category) => a.cantidad_productos - b.cantidad_productos,
      width: '200px'
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      width: '200px',
      render: (text: any) => formatDateTime(text)
    },
    {
      title: 'Modificado',
      dataIndex: 'updatedAt',
      width: '200px',
      render: (text: any) => formatDateTime(text)
    },
    {
      title: 'Actions',
      width: '200px',
      showOnResponse: true,
      showOnDesktop: true,
      dataIndex: '',
      render: (text: any, item: Category) => (
        <div className="flex flex-col gap-1 mx-auto justify-center items-center" key={text}>
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

  return (
    <div className="px-3 py-5 ">
      <h1 className="mb-3 text-3xl font-semibold">Categorias</h1>
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
                setIsModalVisible(true)
              }}
            >
              Agregar Categoria
            </button>
            <button
               className="bg-[#1976d3]/80 text-white rounded-md p-2"
              onClick={() => {
                dispatch(getAllCategories())
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
        title={edit ? 'Modificar categoria' : 'Agregar categoria'}
        open={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false)
          setDataEdit(null)
        }}
      >
        {edit && dataEdit !== null && (
          <Form
            layout="vertical"
            onFinish={handleEditData}
            form={formEdit}
          >
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <button
                           className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full"
              type="submit"
            >
              Modificar categoria
            </button>
          </Form>
        )}
        {!edit && (
          <Form onFinish={handleAddData} form={form} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true }]}
              className="flex flex-col"
            >
              <Input />
            </Form.Item>

            <button
                            className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full"
              type="submit"
            >
              Agregar categoria
            </button>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default Categories
