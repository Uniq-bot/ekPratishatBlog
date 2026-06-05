


export const fetchBlogs = async ({
  page,
  limit,
  tags = [],
  category,
}: {
  page: number;
  limit: number;
  tags?: string[];
  category?: string;
}) => {
  const queryParams = new URLSearchParams();

  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));

  if (tags.length > 0) {
    queryParams.set("tags", tags.join(","));
  }

  if (category && category !== "all") {
    queryParams.set("category", category);
  }

  const res = await fetch(`/api/blogs?${queryParams.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

export const fetchCategory= async()=>{
  const res= await fetch("/api/categories")

  if(!res.ok){
    throw new Error("Failed to fetch categories")
  }
  return res.json();
}

export const createBlogs= async(newBlog: any)=>{

    const res= await fetch("/api/blogs", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newBlog)
    })
    console.log(res)

    if(!res){
        throw new Error("Failed to create blog");
    }

    return res.json();
}

export const fetchTags= async()=>{
    const res= await fetch("/api/tags")
    if(!res.ok){
        throw new Error("Failed to fetch tags")
    }
    return res.json();
}

export const createTag= async(newTag:any)=>{
  const res= await fetch("/api/tags", {
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(newTag)
  })
  console.log(res)
 
}


export const createCategory= async(newCat:any)=>{
  const res= await fetch("/api/categories", {
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(newCat)
  })
  console.log(res)
 
}