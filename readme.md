mongodb  relationship 
one to many | approch 1:- (one to few)
store the child document inside parent 

 //res.status(statuscode).send(message);

 <% if (success && success.length) { %>
    <div class="alert alert-success" role="alert">
        <%=success%>
      </div>
<% } %>


  <% if(Curuser && Curuser._id.equals(listing.owner._id)) { %>


  type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,

        .post(upload.single('listing[image]') , (req ,res)=>{
res.send(req.file);
})


mongodb://127.0.0.1:27017/wanderlust