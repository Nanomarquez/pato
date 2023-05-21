import { Button, Input, Table, Form, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  getAllProveedores,
  putProveedor,
  postProveedor,
  deleteProveedor,
  aumentarProveedor,
  type Proveedor
} from '../redux/slices/proveedores'
import Swal from 'sweetalert2'
import { formatDateTime } from '../utils/utils'
import { Link, useNavigate } from 'react-router-dom';

function Proveedores() {
  const navigate = useNavigate()
  const { proveedores } = useAppSelector((state) => state.proveedores)
  const [data, setData] = useState<Proveedor[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [edit, setEdit] = useState(false)
  const [aumentar, setAumentar] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataEdit, setDataEdit] = useState<Proveedor | null>()
  const [formEdit] = Form.useForm()
  const [form] = Form.useForm()
  const [formAumentar] = Form.useForm()
  const dispatch = useAppDispatch()
  const [addData, setAddData] = useState<any>()
  const [idAumentar, setIdAumentar] = useState<any>()
  useEffect(() => {
    dispatch(getAllProveedores())
  }, [])
  useEffect(() => {
    setData(proveedores)
  }, [proveedores])

  const handleSearch = (value: string) => {
    setSearchQuery(value.toLowerCase())
  }

  const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(searchQuery)
  )

  const handleEdit = (record: Proveedor) => {
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
    dispatch(putProveedor(dataEdit?.id, newData))
    setIsModalVisible(false)
  }
  const handleAddData = (values: any) => {
    const newData = {
      ...values
    }
    dispatch(postProveedor(newData))
    setIsModalVisible(false)
    form.resetFields()
    setAddData(null)
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'info',
      title: 'Estas seguro que quieres eliminar este proveedor?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteProveedor(id))
      }
    })
  }

  const handleAumentar = (id:string) =>{
    setIdAumentar(id)
    setAumentar(true)
    setIsModalVisible(true)
  }

  const handleAumentarPrecio = (values:any) => {
    console.log(values)
    const data = {
      id: idAumentar,
      aumentar: values.aumentar
    }
    Swal.fire({
      icon: 'info',
      title: 'Estas seguro que quieres aumentar este proveedor?',
      text: "Todos los productos de este proveedor seran aumentados un " + values.aumentar + "%",
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(aumentarProveedor(data))
      }
    })
  }
  
  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      sorter: (a: Proveedor, b: Proveedor) => a.nombre.localeCompare(b.nombre),
      fixed: 'left',
      width: '200px',
      onclick: (proveedor: Proveedor) => console.log('hola')
    },
    {
      title: 'Cantidad de Productos',
      dataIndex: 'cantidad_productos',
      sorter: (a: Proveedor, b: Proveedor) => a.cantidad_productos - b.cantidad_productos,
      width: '200px'
    },
    {
      title: 'Precio sugerido',
      dataIndex: 'precio_sugerido',
      sorter: (a: Proveedor, b: Proveedor) => a.precio_sugerido - b.precio_sugerido,
      width: '200px',
      render: (a:any) => <p>% {a} </p>
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
      render: (text: any, item: Proveedor) => (
        <div className="grid grid-cols-2 gap-1 mx-auto justify-center items-center" key={text}>
          <button
            className="w-[100px] bg-green-400 py-[5px] hover:text-white p-1 rounded-md"
            onClick={() => {
              handleAumentar(item.id)
            }}
          >
            Aumentar
          </button>
          <Link to={`/proveedores/${item.id}`}
          target='_blank'
             className="w-[100px] p-1 rounded-md py-[5px] hover:shadow-md duration-200 bg-[#1976d3]/80 button text-white"
          >
            Ver productos
          </Link>
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

  const defaultSorting = [{
    id: 'createdAt',
    desc: true,
  }];

  return (
    <div className="px-3 py-5 ">
      <h1 className="mb-3 text-3xl font-semibold">Proveedores</h1>
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
              Agregar Proveedor
            </button>
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2"
              onClick={() => {
                dispatch(getAllProveedores())
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
        title={edit ? 'Modificar proveedor' : aumentar ? "Ingrese cuanto quiere aumentar" : 'Agregar proveedor'}
        open={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false)
          setDataEdit(null)
          setAumentar(false)
          setIdAumentar(null)
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
            <Form.Item name="precio_sugerido" label="Precio sugerido %">
              <Input />
            </Form.Item>
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full"
              type="submit"
            >
              Modificar proveedor
            </button>
          </Form>
        )}
        {!edit && !aumentar && (
          <Form onFinish={handleAddData} form={form} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true }]}
              className="flex flex-col"
            >
              <Input />
            </Form.Item>
            <Form.Item name="precio_sugerido" label="Precio sugerido %">
              <Input />
            </Form.Item>
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full"
              type="submit"
            >
              Agregar proveedor
            </button>
          </Form>
        )}
        {aumentar && (
          <Form onFinish={handleAumentarPrecio} form={formAumentar} layout="vertical">
            <Form.Item
              name="aumentar"
              label="Aumentar %"
              rules={[{ required: true }]}
              className="flex flex-col"
            >
              <Input />
            </Form.Item>
            <button
              className="bg-[#1976d3]/80 text-white rounded-md p-2 w-full"
              type="submit"
            >
              Aumentar precios
            </button>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default Proveedores
