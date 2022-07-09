import React, {useState} from 'react';
import { Table, Button, Modal, Input, DatePicker, Form, Select} from 'antd';
import moment from 'moment'


const Main = () => {

  const [dataSource, setDataSource] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);




    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this item?",
            okText:"Yes",
            okType:"danger",
            onOk: ()=>{
                setDataSource((pre) => {
                    return pre.filter((list) => record.id !== list.id);
                   });
            }
        })  
        
    };

    const resetAdding = () => {
        setIsAdding(false);
        setNewItem(null);
    }

    const handleAdd = () => {
        setIsAdding(true);
        setNewItem({
            id: parseInt(Math.random()*1000),
            timeStamp: (new Date().toLocaleString()),
            title: newItem?.title,
            description: newItem?.description,
            dueDate: newItem?.dueDate
        })   
    }

    const resetEditng = () => {
        setIsEditing(false);
        setEditingItem(null);
    }

    const handleEdit = (record) => {
        setIsEditing(true);
        setEditingItem({...record});
    }

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
      };

    


    const columns = [
        {   
            key: 0,
            title: "Time Stamp",
            dataIndex: "timeStamp",
            sorter:(record1, record2) => {
                return record1.timeStamp > record2.timeStamp
            }
        },
        {   
            key: 1,
            title: "Title",
            dataIndex: "title",
            sorter:(record1, record2) => {
                return record1.title > record2.title
            }
        },
        {   
            key: 2,
            title: "Description",
            dataIndex: "description",
            sorter:(record1, record2) => {
                return record1.description > record2.description
            }
        },
        {
            key: 3,
            title: "Due Date",
            dataIndex: "dueDate",
        
        },
        {
            key: 4,
            title: "Status",
            dataIndex: "status",
            
        },
        {
            key: 5,
            title: "Actions",
            render: (record)=> {
                return <div>

                <Button onClick={() => {
                    handleEdit(record)
                }}>
                <i className='fa fa-pen' style={{ cursor:"pointer"}}></i>
                </Button>

                <Button style={{cursor:"pointer", marginRight:"10px", borderColor:"red" }} onClick={() => {
                        handleDelete(record)
                    }}><i className='fa fa-trash' ></i></Button>

                    
                    
                </div>
            }
        }
      ]


  return (
    <div>
        <Button type='primary' onClick={()=>handleAdd()} style={{marginTop: "10px", marginBottom:"10px"}}>Add a todo</Button>
        <Table
      dataSource={dataSource}
      columns={columns}
        rowKey="id"
        pagination={true}
      >

      </Table>

{/* Adding Modal */}

    <Modal 
    title="Add a ToDo item"
    okText="Done"
    visible={isAdding}
    onCancel={() => {
        resetAdding();
    }}
    onOk = {() => {
        console.log(newItem);
        setDataSource(pre => {
            if(pre == null){
                return [newItem];
            }
                return [...pre, newItem]; 
        })
        resetAdding();
    }}
    >
    <Form layout='vertical'>
    <Form.Item label="Title" name="title" rules={[{ required: true}]}>
    <Input
        id="title" value={newItem?.title} placeholder="Enter the title" onChange={(e)=>{
            setNewItem(pre=> {
                return{...pre, title:e.target.value}
            })
        }} />
    </Form.Item>

    <Form.Item label="Description" name="description" rules={[{ required: true}]}>
    <Input
        id="description" value={newItem?.description} placeholder="Enter the description" onChange={(e)=>{
            setNewItem(pre=> {
                return{...pre, description:e.target.value}
            })
        }} />
    </Form.Item>
    <Form.Item name="dueDate" label="Due Date" >
    <DatePicker 
            disabledDate={disabledDate}
            moment = {newItem?.dueDate}
            onChange={(moment, dateString) => {
                console.log(dateString);
                setNewItem(pre=> {
                    return{...pre, dueDate:dateString}
                })
            }}
        />
    </Form.Item>

    <Form.Item label="Status" name="status" rules={[{ required: true}]}>
    <Select
        id="description" value={newItem?.status} onChange={(option)=>{
            setNewItem(pre=> {
                return{...pre, status:option}
            })
        }}>
        <Select.Option value="Open">Open</Select.Option>
        <Select.Option value="Working">Working</Select.Option>
    </Select>
    </Form.Item>
    <Form.Item>
    <Button htmlType="submit" type="primary" id="addBtn" >Add</Button>
    </Form.Item>
    </Form>
    
    </Modal>

{/* End of Adding Modal */}

{/* Editing Modal */}
    <Modal
      title="Edit ToDo item"
      okText="Save"
      visible={isEditing}
      onCancel={()=>{
        resetEditng();
      }}
      onOk={()=>{
        setDataSource(pre => {
            return pre.map ((item) => {
                if(item.id === editingItem.id){
                    return editingItem;
                }
                    else {
                        return item;
                    }
            });
      });
      resetEditng();
    }}
      > <Form layout='vertical'>
      <Form.Item label="Title" name="title" rules={[{ required: true}]}>
      <Input
          id="title" value={editingItem?.title} placeholder="Enter the title" onChange={(e)=>{
              setEditingItem(pre=> {
                  return{...pre, title:e.target.value}
              })
          }} />
      </Form.Item>
  
      <Form.Item label="Description" name="description" rules={[{ required: true}]}>
      <Input
          id="description" value={editingItem?.description} placeholder="Enter the description" onChange={(e)=>{
              setEditingItem(pre=> {
                  return{...pre, description:e.target.value}
              })
          }} />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" >
      <DatePicker 
              disabledDate={disabledDate}
              moment = {editingItem?.dueDate}
              onChange={(moment, dateString) => {
                  console.log(dateString);
                  setEditingItem(pre=> {
                      return{...pre, dueDate:dateString}
                  })
              }}
          />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true}]}>
    <Select
        id="description" value={newItem?.status} onChange={(option)=>{
            setEditingItem(pre=> {
                return{...pre, status:option}
            })
        }}>
        <Select.Option value="Open">Open</Select.Option>
        <Select.Option value="Working">Working</Select.Option>
        <Select.Option value="Done">Done</Select.Option>
        <Select.Option value="Overdue">Overdue</Select.Option>
    </Select>
    </Form.Item>
    <Form.Item>
    <Button htmlType="submit" type="primary" id="addBtn" >Add</Button>
    </Form.Item>
  
      </Form>
      </Modal>

{/* End of Editing Modal */}


    </div>
  )
}

export default Main;