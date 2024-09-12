'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import UpdateModal from './update.modal';
import { useState } from 'react';
import DeleteModal from './delete.modal';
import Link from 'next/link';
interface IProps{
  blogs:IBlog[]
}
function AppTable(props: IProps) {
  const {blogs} = props;
  const [blogItem,setBlogItem] = useState<IBlog | null>(null);
  const [showModalCreate,setShowModalCreate] = useState<boolean>(false)
  const [showModalUpdate,setShowModalUpdate] = useState<boolean>(false)
  const [showModalDelete,setShowModalDelete] = useState<boolean>(false)

  const handleShowModalCreate = () => {
    setShowModalCreate(prev=> !prev)
  }
   const handleShowModalEdit = (item: IBlog) =>{
    setBlogItem(item)
    setShowModalUpdate(prev=> !prev);
   }
   const handleShowModalDelete = (item: IBlog) => {
    setBlogItem(item)
    setShowModalDelete(prev=> !prev)
  }

  return (
    <>
    <div className="my-3 d-flex justify-content-between">
        <h1>Table Blogs</h1>
        <Button variant='info' onClick={handleShowModalCreate}>Add New</Button>
    </div>
         <Table striped bordered hover>
     <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {      blogs?.map(item =>{
          return(
            <tr key={item.id}>
               <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>
              <Link className="btn btn-primary" href={`/blogs/${item.id}`}>View</Link>
              <Button variant='warning' className="mx-3"  onClick={() => handleShowModalEdit(item)}>Edit</Button>
              <Button variant='danger' onClick={() => handleShowModalDelete(item)}>Delete</Button>
            </td>
          </tr>
          )


})}


      </tbody>
    </Table>
    <CreateModal show={showModalCreate} setShow={setShowModalCreate}/>
    <UpdateModal show={showModalUpdate} setShow={setShowModalUpdate} blogItem={blogItem} setBlogItem={setBlogItem}/>
    <DeleteModal show={showModalDelete} setShow={setShowModalDelete} blogItem={blogItem} setBlogItem={setBlogItem}/>
    </>
  );
}

export default AppTable;