  import useFetch from "../../hooks/useFetch";
  import PageTemplate from "../../components/pageTemplate/PageTemplate";
  import Typography from "../../components/typography/Typography";
  import BackButton from "../../components/BackButton/BackButton";
  import PageGap from "../../components/pageGap/PageGap";
  import "./Shop.css";

  const Shop = () => {
    const { data, isLoading, error } = useFetch({
      url: 'https://script.google.com/macros/s/AKfycbyZVob9L1HLQh4PO5zbAwL9182lMBnMCF31wgnkUuq3BqMj_es-gnVsOfu601NhRIOq/exec?timestamp=${new Date().getTime()}'
    });

    console.log("Fetched Shop Data:", data);

    // Handle errors
    if (error) {
      return (
        <PageTemplate>
          <Typography variant="largeHeading">Garage Shop</Typography>
          <Typography variant="body" className="error-message">
            Failed to load shop items. Please try again later. Error: {error}
          </Typography>   
        </PageTemplate>
      );
    }
    if (!data) {
      console.error("Shop data is null or undefined.");
      return (
        <PageTemplate>
          <Typography variant="largeHeading">Garage Shop</Typography>
          <Typography variant="body" className="error-message">
            No data available at the moment. Please try again later.
          </Typography>
        </PageTemplate>
      );
    }
    

    // Handle loading state
    if (isLoading) {
      return (
        <PageTemplate>
          <Typography variant="largeHeading">Garage Shop</Typography>
          <Typography variant="body">Loading shop items...</Typography>
        </PageTemplate>
      );
    }

    // Validate data format
    if (!Array.isArray(data)) {
      console.error("Invalid shop data format:", data);
      return (
        <PageTemplate>
          <Typography variant="largeHeading">Garage Shop</Typography>
          <Typography variant="body" className="error-message">
            Invalid data format received from the API.
          </Typography>
        </PageTemplate>
      );
    }

    // Separate users and items
    const user = data.find((entry) => entry.name && entry.credits) || { name: "Unknown", credits: 0 };
    console.log("Raw Data Entries:", data);
    const items = data.filter((entry) => {
      const isValid = entry.itemName && entry.innocreditPrice !== undefined;
      console.log(`Entry: ${JSON.stringify(entry)}, isValid: ${isValid}`);
      return isValid;
    });
    
    
    console.log("Rendered Items:", items);


    return (
      <PageTemplate>
        <PageGap>
          <div className="heading-space">
            <Typography variant="heading">Garage Shop</Typography>
            <BackButton />
          </div>

          <div className="heading-space">
            <Typography variant="smallHeading">
              Welcome to Garage Shop, {user.name.toUpperCase()}
            </Typography>
            <div className="credits">
            <Typography variant="body" className="credits-label">
          Inno Credits: 
          </Typography>
          <Typography variant="body" className="credits-value">
          {user.credits}
          </Typography>
        
              <img
                src="/coin-icon.png"
                alt="Credits Icon"
                className="credits-icon"
              />
            </div>
          </div>
          <div className="shop-items-container">
  {items.map((item, index) => {
    console.log("Item Data:", item); // Move console.log here
    return (
      <div className="shop-item" key={index}>
        {/* Product Image */}
        <img
          src={item.image?.preview_url || "/default-placeholder.png"}
          alt={item.itemName || "Unnamed Item"}
          className="item-image"
          onError={(e) => (e.target.src = "/default-placeholder.png")}
        />
        {/* Description */}
        <Typography variant="subtitle" className="item-description">
          {item.description || "No description available."}
        </Typography>

        {/* Product Name */}
        <Typography variant="body" className="item-name">
          {item.itemName || "No Name"}
        </Typography>

        {/* Price */}
        <div className="item-price">
          <Typography variant="body">{item.innocreditPrice || 0} Credits</Typography>
          <img
            src="/coin-icon.png"
            alt="Credits Icon"
            className="credits-icon"
          />
        </div>  
        {/* Quantity Controls */}
  <div className="item-stock-quantity">
    <Typography variant="body" className="item-stock">
      {item.inventory ? `Stock: ${item.inventory}` : "Out of Stock"}
    </Typography>
    <div className="quantity-controls">
      <button>-</button>
      <Typography variant="body" className="quantity-count">0</Typography>
      <button>+</button>
    </div>
  </div>
      </div>
    );
  })}
</div>


<div className='checkout>'>
              
          <button className="checkout-button"><img
                src="/shopping-cart.png"
                alt="Cart Icon"
                className="cart-icon"
              />Check Out</button>
       </div> </PageGap>
      </PageTemplate>
    );
  };

  export default Shop;
