const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabaseClient");
const { upload } = require("./utils");

router.get("/", async (req, res) => {
  const {
    offset: _offset,
    limit: _limit,
    sort_attribute = 'created_at',
    sort_direction = 'desc'
  } = req.query;

  // query params come in as strings. conver them into numbers when necessary
  const offset = Number(_offset) || 0;
  const limit = Number(_limit) || 0;

  try {
    const { data, count, error } = await supabase
      .from("projects")
      .select(
        "id, title, images, employer_id",
        offset === 0 ? { count: "exact" } : undefined
      )
      .range(offset, offset + limit)
      .order(sort_attribute, { ascending: sort_direction === 'asc' });

    if (error) {
      throw error;
    }

    res.status(200).send({
      entities: data,
      totalCount: count,
    });
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
    console.error("Supabase Select Error:", error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error: " + error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const updateData = req.body;

    console.log("Update Project Request:", {
      projectId,
      updateData,
    });

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", projectId);

    if (error) {
      console.error("Supabase Update Error:", error);
      throw error;
    }

    res.status(200).send("Data sent to Supabase!");
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error: " + error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw error;
    }

    res.status(200).send("Data sent to Supabase!");
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error: " + error.message);
  }
});

// Handle project submission with static file upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { title, description, type, budget, location } = req.body;

    const employer_id = req.session.userId;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // artist id is set to 0 as default for now
    const { data, error } = await supabase.from("projects").upsert([
      {
        title,
        description,
        type,
        budget,
        location,
        images: imageUrl ? [imageUrl] : [],
        employer_id,
        artist_id: 0,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Project submission error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
