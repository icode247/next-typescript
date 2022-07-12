import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IBlog } from "./api/interface/blog";
import { BlockList } from "net";
import { brotliDecompress } from "zlib";

const Home: NextPage = () => {
  const [formInputs, setFormInputs] = useState<IBlog[]>([]);
  const [modal, setModal] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    //send request to the api
    fetch("/api/createBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formInputs,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs([...blogs, data]);
      });
  };

  return (
    <div className={""}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={""}>Bloger</h1>
        <ul>
          <li>Home</li>
          <li>
            <button className={styles.button} onClick={() => setModal(true)}>
              Create new
            </button>
          </li>
        </ul>
      </header>
      <main className={styles.main}>
        <h2>Blog Posts</h2>
        <div className={styles.container}>
          {blogs.map((blog: IBlog) => (
            <div className={styles.card} key={blog.title}>
              <div className={styles.cardImage}>
                <Image
                  src={blog.cover}
                  alt="{blog.title}"
                  width={300}
                  height={200}
                />
              </div>
              <div className={styles.cardBody}>
                <h3>{blog.title}</h3>
                <p>
                  {blog.content}
                </p>
              </div>
            </div>
          ))}

        </div>
        <div
          className={styles.modal}
          style={{ display: modal ? "block" : "none" }}
        >
          <div className={styles.modalBody}>
            <span onClick={() => setModal(false)}>X</span>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <div>
                <h4>Create new Blog</h4>
                <div className="Form--field">
                  <input onChange={handleChange} type="text" id="title" />
                </div>
                <div className="Form--field">
                  <input onChange={handleChange} type="text" id="content" />
                </div>
              </div>
              <div className="Form--field">
                <input onChange={handleChange} type="text" id="cover" />
              </div>
              <button className={styles.button}>Add Post</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
