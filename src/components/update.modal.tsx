'use client'

import { useEffect, useState } from 'react';
import {Form,Modal,Button} from 'react-bootstrap/';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps{
  show: boolean,
  setShow: (v:boolean) => void;
  blogItem:IBlog| null;
  setBlogItem: (v:IBlog| null) => void;
}
function UpdateModal(props: IProps) {
  const {show,setShow,blogItem,setBlogItem} = props;

   
  const [id,setId] = useState<number>(0);
  const [title,setTitle] = useState<string>("");
  const [author,setAuthor] = useState<string>("");
  const [content,setContent] = useState<string>("");
  const handleClose = () => {
    setShow(false);
    setTitle("")
    setAuthor("")
    setContent("")

  };

  const handleSave = async () =>{
    const url = "http://localhost:8000/blogs";
    if(!title || !author || !content) {
      toast.error("Lỗi!")
      return;
    }
    const dataForm = {
      title:title,
      author:author,
      content:content
    }
    try {
      const response = await fetch(`${url}/${id}`,{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
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
      setTitle(blogItem.title)
      setAuthor(blogItem.author)
      setContent(blogItem.content)
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
      <Modal.Title>Create Blog</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" 
            value={title} 
            onChange={(e)=>{ setTitle(e.target.value)  }} 
        />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" 
                    value={author} 
                    onChange={(e)=>{ setAuthor(e.target.value)  }} 
        />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3}
                    value={content} 
                    onChange={(e)=>{ setContent(e.target.value)  }} 
        />
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </Modal.Footer>
  </Modal>
    </>
  );
}

export default UpdateModal;