'use client'

import { useEffect, useState } from 'react';
import {Modal,Button} from 'react-bootstrap/';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps{
  show: boolean,
  setShow: (v:boolean) => void;
  blogItem:IBlog| null;
  setBlogItem: (v:IBlog| null) => void;
}
function DeleteModal(props: IProps) {
  const {show,setShow,blogItem,setBlogItem} = props;

   
  const [id,setId] = useState<number>(0);
  const handleClose = () => {
    setShow(false);

  };

  const handleSave = async () =>{
    const url = "http://localhost:8000/blogs";
    try {
      const response = await fetch(`${url}/${id}`,{
        method:"DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      toast.success("Success!")
      handleClose()
      mutate(url)
    } catch (error) {

    }
  }
  useEffect(()=>{
    if(blogItem &&blogItem.id){
      setId(blogItem.id)
      setBlogItem(null)
    }
  },[blogItem,setBlogItem])

  return (
    <>

  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Delete Blog</Modal.Title>
    </Modal.Header>
    <Modal.Body>
       Do you want to delete this Blog?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={handleSave}>Yes</Button>
    </Modal.Footer>
  </Modal>
    </>
  );
}

export default DeleteModal;